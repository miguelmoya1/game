import { Inject, Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { CreateItemDataDto, UpdateItemDataDto } from '../../../../application/commands';
import { Item } from '../../../../domain/entities';
import { REDIS_CLIENT } from '../../../redis/redis.provider';
import { STATIC_DATA } from '../../services/static-data-loader.service.contract';
import { ItemRepository } from '../contracts/item.repository.contract';
import { itemToEntity } from '../mappers/item.mapper';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {}

  async getAll() {
    const rawItems = await this.redisClient.get(STATIC_DATA.items);

    if (!rawItems) {
      return [];
    }

    const items = JSON.parse(rawItems) as Item[];

    return items.map((item) => itemToEntity(item));
  }

  async create(item: CreateItemDataDto) {
    const items = await this.getAll();

    const existingItem = items.find((i) => i.name === item.name);

    if (existingItem) {
      return false;
    }

    items.push({
      id: crypto.randomUUID(),
      name: item.name,
      description: item.description,
      effects: item.effects,
      imageUrl: item.imageUrl,
      rank: item.rank,
      itemType: item.itemType,
      setId: item.setId,
      spawnCategories: item.spawnCategories,
    });

    await this.redisClient.set(STATIC_DATA.items, JSON.stringify(items));

    return true;
  }

  async update(id: string, updateItemDto: UpdateItemDataDto) {
    const items = await this.getAll();

    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return false;
    }

    const existingItem = items[itemIndex];

    items[itemIndex] = {
      ...existingItem,
      ...updateItemDto,
      id: existingItem.id,
    };

    await this.redisClient.set(STATIC_DATA.items, JSON.stringify(items));

    return true;
  }

  async delete(id: string) {
    const items = await this.getAll();

    const itemIndex = items.findIndex((i) => i.id === id);

    if (itemIndex === -1) {
      return false;
    }

    items.splice(itemIndex, 1);

    await this.redisClient.set(STATIC_DATA.items, JSON.stringify(items));

    return true;
  }
}

// TODO: hacer sistema de auto generacion de ids igual que en los sets (nombre raro)
