import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { CreateDungeonDataDto } from 'src/core/application/commands';
import { DungeonEntity } from 'src/core/domain/entities';
import { DungeonStatus, DungeonType, Rank } from '../../../../domain/enums';
import { REDIS_CLIENT } from '../../../redis/redis.provider';
import { DungeonRepository } from '../contracts/dungeon.repository.contract';

const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

@Injectable()
export class DungeonRepositoryImpl implements DungeonRepository {
  readonly #totalSearchResults = 50;

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async create(data: CreateDungeonDataDto) {
    const dungeonId = uuidv4();
    const dungeonKey = `dungeon:${dungeonId}`;
    const membersKey = `dungeon:${dungeonId}:members`;
    const placeDungeonKey = `place:${data.placeId}:dungeon`;
    const startTime = Date.now();
    const endTime = startTime + data.durationSeconds * 1000;
    const dungeon = DungeonEntity.create({
      id: dungeonId,
      placeId: data.placeId,
      placeName: data.placeName,
      lat: data.lat,
      lng: data.lng,
      type: data.type,
      rank: data.rank,
      status: DungeonStatus.OPEN,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      maxPlayers: data.maxPlayers,
      memberIds: [],
    });
    const pipeline = this.redis.pipeline();

    pipeline.hmset(dungeonKey, dungeon);
    pipeline.expire(dungeonKey, data.durationSeconds + 60);
    pipeline.sadd(membersKey);
    pipeline.geoadd('active_dungeons_geo', data.lng, data.lat, dungeonId);
    pipeline.set(placeDungeonKey, dungeonId, 'EX', data.durationSeconds);

    await pipeline.exec();

    return dungeon;
  }

  async findById(dungeonId: string) {
    const dungeonKey = `dungeon:${dungeonId}`;
    const details = await this.redis.hgetall(dungeonKey);
    if (!details || Object.keys(details).length === 0) return null;
    const membersKey = `dungeon:${dungeonId}:members`;
    const memberIds = await this.redis.smembers(membersKey);

    return DungeonEntity.create({
      id: dungeonId,
      placeId: details.placeId,
      placeName: details.placeName,
      lat: parseFloat(details.lat),
      lng: parseFloat(details.lng),
      type: details.type as DungeonType,
      rank: details.rank as Rank,
      status: details.status as DungeonStatus,
      startTime: new Date(Number(details.startTime)),
      endTime: new Date(Number(details.endTime)),
      maxPlayers: parseInt(details.maxPlayers, 10),
      memberIds,
    });
  }

  async findNearby(lat: number, lng: number, radiusKm: number) {
    const geoResults = (await this.redis.georadius(
      'active_dungeons_geo',
      lng,
      lat,
      radiusKm,
      'km',
      'WITHCOORD',
      'COUNT',
      this.#totalSearchResults,
    )) as [string, string][];

    const dungeons: DungeonEntity[] = [];
    for (const [dungeonId] of geoResults) {
      const dungeon = await this.findById(dungeonId);
      if (dungeon) {
        dungeons.push(dungeon);
      } else {
        await this.redis.zrem('active_dungeons_geo', dungeonId);
      }
    }
    return dungeons;
  }

  async update(dungeon: DungeonEntity) {
    const dungeonKey = `dungeon:${dungeon.id}`;

    const details = {
      placeId: dungeon.placeId,
      placeName: dungeon.placeName,
      lat: dungeon.lat.toString(),
      lng: dungeon.lng.toString(),
      type: dungeon.type,
      rank: dungeon.rank,
      status: dungeon.status,
      startTime: dungeon.startTime.getTime().toString(),
      endTime: dungeon.endTime.getTime().toString(),
      maxPlayers: dungeon.maxPlayers.toString(),
    };

    await this.redis.hmset(dungeonKey, details);

    return dungeon;
  }

  async delete(dungeonId: string) {
    const dungeonKey = `dungeon:${dungeonId}`;
    const membersKey = `dungeon:${dungeonId}:members`;
    const members = await this.redis.smembers(membersKey);
    const pipeline = this.redis.pipeline();

    pipeline.del(dungeonKey);
    pipeline.del(membersKey);
    pipeline.zrem('active_dungeons_geo', dungeonId);

    for (const memberId of members) {
      pipeline.del(`player:${memberId}:dungeon`);
    }

    await pipeline.exec();
  }
}
