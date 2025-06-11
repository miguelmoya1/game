import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { CreateDungeonDataDto } from '../../../../application/commands';
import { DungeonEntity, Reward } from '../../../../domain/entities';
import { DungeonStatus, DungeonType, Rank } from '../../../../domain/enums';
import { REDIS_CLIENT } from '../../../redis/redis.provider';
import { DungeonRepository } from '../contracts/dungeon.repository.contract';

@Injectable()
export class DungeonRepositoryImpl implements DungeonRepository {
  readonly #durationSeconds = 3600; // 1 hour in seconds
  readonly #activePlacesSetKey = 'dungeon:active_place_ids';

  constructor(@Inject(REDIS_CLIENT) private readonly redis: Redis) {}

  async cleanStaleActivePlaces() {
    const activePlaceIds = await this.redis.smembers(this.#activePlacesSetKey);
    if (!activePlaceIds || activePlaceIds.length === 0) {
      return 0;
    }
    const existsResults = await Promise.all(activePlaceIds.map((id) => this.redis.exists(`dungeon:${id}`)));
    const validPlaceIds = activePlaceIds.filter((_, idx) => existsResults[idx] === 1);
    if (validPlaceIds.length !== activePlaceIds.length) {
      await this.redis.del(this.#activePlacesSetKey);
      if (validPlaceIds.length > 0) {
        await this.redis.sadd(this.#activePlacesSetKey, ...validPlaceIds);
      }
      return activePlaceIds.length - validPlaceIds.length;
    }
    return 0;
  }

  async getActiveDungeonPlaceIds(): Promise<string[]> {
    return this.redis.smembers(this.#activePlacesSetKey);
  }

  async create(data: CreateDungeonDataDto) {
    const dungeonKey = `dungeon:${data.placeId}`;
    const startTime = Date.now();
    const endTime = startTime + this.#durationSeconds * 1000;
    const dungeon = DungeonEntity.create({
      placeId: data.placeId,
      lat: data.lat,
      lng: data.lng,
      type: data.type,
      rank: data.rank,
      status: DungeonStatus.Open,
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      rewards: data.rewards || [],
    });
    const pipeline = this.redis.pipeline();
    pipeline.hmset(dungeonKey, {
      placeId: dungeon.placeId,
      lat: dungeon.lat.toString(),
      lng: dungeon.lng.toString(),
      type: dungeon.type,
      rank: dungeon.rank,
      status: dungeon.status,
      startTime: dungeon.startTime.getTime().toString(),
      endTime: dungeon.endTime.getTime().toString(),
      rewards: JSON.stringify(dungeon.rewards || []),
    });
    pipeline.expire(dungeonKey, this.#durationSeconds + 60);
    pipeline.sadd(this.#activePlacesSetKey, data.placeId);
    await pipeline.exec();
    return dungeon;
  }

  async findById(placeId: string) {
    const dungeonKey = `dungeon:${placeId}`;
    const details = await this.redis.hgetall(dungeonKey);
    if (!details || Object.keys(details).length === 0) return null;
    return DungeonEntity.create({
      placeId: details.placeId,
      lat: parseFloat(details.lat),
      lng: parseFloat(details.lng),
      type: details.type as DungeonType,
      rank: details.rank as Rank,
      status: details.status as DungeonStatus,
      startTime: new Date(Number(details.startTime)),
      endTime: new Date(Number(details.endTime)),
      rewards: (JSON.parse(details.rewards) || []) as Reward[],
    });
  }

  async hasActiveDungeon(placeIds: string[]) {
    if (!placeIds || placeIds.length === 0) {
      return {};
    }

    const dungeonKeys = placeIds.map((id) => `dungeon:${id}`);
    const pipeline = this.redis.pipeline();
    dungeonKeys.forEach((key) => {
      pipeline.exists(key);
    });
    const results = await pipeline.exec();

    if (!results || results.length === 0) {
      return {};
    }

    const activeDungeons: Record<string, boolean> = {};

    return results.reduce((acc, result, index) => {
      acc[placeIds[index]] = !!result[1];
      return acc;
    }, activeDungeons);
  }

  async update(dungeon: DungeonEntity) {
    const dungeonKey = `dungeon:${dungeon.placeId}`;
    const details = {
      placeId: dungeon.placeId,
      lat: dungeon.lat.toString(),
      lng: dungeon.lng.toString(),
      type: dungeon.type,
      rank: dungeon.rank,
      status: dungeon.status,
      startTime: dungeon.startTime.getTime().toString(),
      endTime: dungeon.endTime.getTime().toString(),
      rewards: JSON.stringify(dungeon.rewards || []),
    };
    await this.redis.hmset(dungeonKey, details);
    return dungeon;
  }

  async delete(placeId: string) {
    const dungeonKey = `dungeon:${placeId}`;
    await this.redis.del(dungeonKey);
    await this.redis.srem(this.#activePlacesSetKey, placeId);
  }
}
