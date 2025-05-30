import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDataDto } from '../../../../application/commands';
import { UpdateItemDataDto } from '../../../../application/commands/item/dto/update-item-data.dto';
import { ItemRepository } from '../contracts/item.repository.contract';
import { itemToEntity } from '../mappers/item.mapper';
import { REDIS_CLIENT } from '../../../redis/redis.provider';
import { Redis } from 'ioredis';
import { STATIC_DATA } from '../../services/static-data-loader.service.contract';
import { Item } from '../../../../domain/entities';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(
    @Inject(REDIS_CLIENT)
    private readonly redisClient: Redis,
  ) {}

  async findAll() {
    const rawItems = await this.redisClient.get(STATIC_DATA.items);

    if (!rawItems) {
      return [];
    }

    const items = JSON.parse(rawItems) as Item[];

    return items.map((item) => itemToEntity(item));
  }

  async findById(id: string) {
    const items = await this.findAll();

    const item = items.find((item) => item.id === id);

    if (!item) {
      return null;
    }

    return itemToEntity(item);
  }

  async create(item: CreateItemDataDto) {
    return false;
  }

  async update(id: string, updateItemDto: UpdateItemDataDto) {
    return false;
  }

  async delete(id: string) {
    return false;
  }
}
