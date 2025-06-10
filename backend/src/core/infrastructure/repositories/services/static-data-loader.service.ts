import { Inject, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import Redis from 'ioredis';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Item, Race, Set, Spell } from '../../../domain/entities';
import { REDIS_CLIENT } from '../../redis/redis.provider';
import { STATIC_DATA, StaticDataLoader } from './static-data-loader.service.contract';

@Injectable()
export class StaticDataLoaderImpl implements OnModuleInit, StaticDataLoader {
  readonly #basePath = join(__dirname, '..', '..', '..', '..', 'data');
  readonly #logger = new Logger(StaticDataLoaderImpl.name);

  constructor(@Inject(REDIS_CLIENT) private readonly _redis: Redis) {}

  async onModuleInit() {
    await this.#loadAndCache<Item[]>(STATIC_DATA.items);
    await this.#loadAndCache<Set[]>(STATIC_DATA.sets);
    await this.#loadAndCache<Spell[]>(STATIC_DATA.spells);
    await this.#loadAndCache<Race[]>(STATIC_DATA.races);
  }

  async #loadAndCache<T>(entity: STATIC_DATA) {
    const filePath = join(this.#basePath, `${entity.replace('static:', '')}.json`);
    const raw = await readFile(filePath, 'utf-8');
    const data = JSON.parse(raw) as T[];

    this.#logger.debug(`Loaded static data for ${entity}: ${data.length} items`);

    await this._redis.set(entity, JSON.stringify(data));
  }

  async saveAndRefresh<T>(value: T, type: STATIC_DATA) {
    const filePath = join(this.#basePath, `${type.replace('static:', '')}.json`);
    await writeFile(filePath, JSON.stringify(value));
    await this._redis.set(type, JSON.stringify(value));
  }
}
