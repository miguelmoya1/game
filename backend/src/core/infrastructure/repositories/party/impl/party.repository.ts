import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { PartyEntity } from '../../../../domain/entities';
import { PartyStatus } from '../../../../domain/enums';
import { REDIS_CLIENT } from '../../../redis/redis.provider';
import { PartyRepository } from '../contracts/party.repository.contract';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

@Injectable()
export class PartyRepositoryImpl implements PartyRepository {
  readonly #logger = new Logger(PartyRepositoryImpl.name);
  readonly #maxMembers = 5;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async create(leaderId: string, status: PartyStatus, description?: string) {
    const partyId = uuidv4();
    const partyKey = `party:${partyId}`;
    const membersKey = `party:${partyId}:members`;
    const playerPartyKey = `player:${leaderId}:party`;
    const partyDetailsData = {
      leaderId,
      maxMembers: this.#maxMembers.toString(),
      creationTime: Date.now().toString(),
      description: description || '',
      status: status || PartyStatus.OPEN,
    };

    this.#logger.debug(`Creating party ${partyId} for leader ${leaderId}`);
    const pipeline = this.redis.pipeline();

    pipeline.hmset(partyKey, partyDetailsData);
    pipeline.sadd(membersKey, leaderId);
    pipeline.set(playerPartyKey, partyId);

    await pipeline.exec();

    return PartyEntity.create({
      id: partyId,
      leaderId,
      maxMembers: this.#maxMembers,
      creationTime: new Date(Number(partyDetailsData.creationTime)),
      memberIds: [leaderId],
      description: partyDetailsData.description,
      status: partyDetailsData.status,
    });
  }

  async findById(partyId: string) {
    const partyKey = `party:${partyId}`;
    const details = await this.redis.hgetall(partyKey);

    if (!details || Object.keys(details).length === 0) {
      return null;
    }

    const membersKey = `party:${partyId}:members`;
    const memberIds = await this.redis.smembers(membersKey);

    return PartyEntity.create({
      id: partyId,
      leaderId: details.leaderId,
      maxMembers: parseInt(details.maxMembers, 10),
      creationTime: new Date(Number(details.creationTime)),
      memberIds,
      description: details.description || '',
      status: details.status as PartyStatus,
    });
  }

  async addMember(partyId: string, playerId: string) {
    const partyKey = `party:${partyId}`;
    const membersKey = `party:${partyId}:members`;
    const playerPartyKey = `player:${playerId}:party`;
    const details = await this.redis.hgetall(partyKey);

    if (!details || Object.keys(details).length === 0) {
      throw new Error('Party not found');
    }

    const existingParty = await this.redis.get(playerPartyKey);

    if (existingParty) {
      throw new Error('Player already in a party');
    }

    const currentMemberCount = await this.redis.scard(membersKey);

    if (currentMemberCount >= parseInt(details.maxMembers, 10)) {
      throw new Error('Party is full');
    }

    const pipeline = this.redis.pipeline();

    pipeline.sadd(membersKey, playerId);
    pipeline.set(playerPartyKey, partyId);

    await pipeline.exec();
  }

  async removeMember(partyId: string, playerId: string) {
    const membersKey = `party:${partyId}:members`;
    const playerPartyKey = `player:${playerId}:party`;
    const currentParty = await this.redis.get(playerPartyKey);

    if (currentParty !== partyId) {
      throw new Error('Player does not belong to this party');
    }

    const pipeline = this.redis.pipeline();

    pipeline.srem(membersKey, playerId);
    pipeline.del(playerPartyKey);

    await pipeline.exec();
    const memberCount = await this.redis.scard(membersKey);

    if (memberCount === 0) {
      await this.delete(partyId);
      return;
    }

    const partyKey = `party:${partyId}`;
    const details = await this.redis.hgetall(partyKey);

    if (details.leaderId === playerId) {
      const remainingMembers = await this.redis.smembers(membersKey);

      if (remainingMembers.length > 0) {
        await this.redis.hset(partyKey, 'leaderId', remainingMembers[0]);
      } else {
        await this.delete(partyId);
      }
    }
  }

  async getPlayerIds(partyId: string) {
    const membersKey = `party:${partyId}:members`;
    return await this.redis.smembers(membersKey);
  }

  async findPartyByPlayer(playerId: string) {
    const playerPartyKey = `player:${playerId}:party`;
    const partyId = await this.redis.get(playerPartyKey);

    if (!partyId) {
      return null;
    }

    return this.findById(partyId);
  }

  async delete(partyId: string) {
    const partyKey = `party:${partyId}`;
    const membersKey = `party:${partyId}:members`;
    const members = await this.redis.smembers(membersKey);
    const pipeline = this.redis.pipeline();

    pipeline.del(partyKey);
    pipeline.del(membersKey);

    for (const memberId of members) {
      pipeline.del(`player:${memberId}:party`);
    }

    await pipeline.exec();
  }
}
