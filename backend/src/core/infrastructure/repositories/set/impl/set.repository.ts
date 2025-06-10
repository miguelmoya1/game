import { Inject, Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { REDIS_CLIENT } from 'src/core/infrastructure/redis/redis.provider';
import { CreateSetDataDto, UpdateSetDataDto } from '../../../../application/commands';
import { Set } from '../../../../domain/entities';
import { STATIC_DATA } from '../../services/static-data-loader.service.contract';
import { SetRepository } from '../contracts/set.repository.contract';
import { setToEntity } from '../mappers/set.mapper';

@Injectable()
export class SetRepositoryImpl implements SetRepository {
  constructor(@Inject(REDIS_CLIENT) private readonly _redis: Redis) {}

  public async getAll() {
    const rawSets = await this._redis.get(STATIC_DATA.sets);

    if (!rawSets) {
      return [];
    }

    const sets = JSON.parse(rawSets) as Set[];

    return sets.map(setToEntity);
  }

  public async getById(id: string) {
    const sets = await this.getAll();

    const set = sets.find((s) => s.id === id);

    if (!set) {
      return null;
    }

    return setToEntity(set);
  }

  public async create(createSetDto: CreateSetDataDto) {
    const sets = await this.getAll();

    const existingSet = sets.find((s) => s.name === createSetDto.name);

    if (existingSet) {
      return false;
    }

    sets.push({
      id: crypto.randomUUID(),
      name: createSetDto.name,
      description: createSetDto.description,
      effects: createSetDto.effects,
    });

    await this._redis.set(STATIC_DATA.sets, JSON.stringify(sets));

    return true;
  }

  public async update(id: string, updateSetDto: UpdateSetDataDto) {
    const sets = await this.getAll();

    const setIndex = sets.findIndex((s) => s.id === id);

    if (setIndex === -1) {
      return false;
    }

    const updatedSet = {
      ...sets[setIndex],
      ...updateSetDto,
    };

    sets[setIndex] = updatedSet;

    await this._redis.set(STATIC_DATA.sets, JSON.stringify(sets));

    return true;
  }

  async delete(id: string) {
    const sets = await this.getAll();

    const setIndex = sets.findIndex((s) => s.id === id);

    if (setIndex === -1) {
      return false;
    }

    sets.splice(setIndex, 1);

    await this._redis.set(STATIC_DATA.sets, JSON.stringify(sets));

    return true;
  }
}
