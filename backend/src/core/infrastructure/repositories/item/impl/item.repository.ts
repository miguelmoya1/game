import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDataDto } from '../../../../application/commands';
import { UpdateItemDataDto } from '../../../../application/commands/item/dto/update-item-data.dto';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { ItemRepository } from '../contracts/item.repository.contract';
import { itemToEntity } from '../mappers/item.mapper';
import { itemInclude } from '../utils/item-includes';

@Injectable()
export class ItemRepositoryImpl implements ItemRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
  ) {}

  async findById(id: string) {
    const now = new Date();
    const result = await this.databaseService.item.findFirst({
      where: {
        id,
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
      include: itemInclude,
    });

    if (!result) {
      return null;
    }

    return itemToEntity(result);
  }

  async search(criteria: string) {
    const now = new Date();
    const result = await this.databaseService.item.findMany({
      where: {
        AND: [
          { OR: [{ deletedAt: null }, { deletedAt: { gt: now } }] },
          {
            OR: [
              {
                id: {
                  contains: criteria,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: criteria,
                  mode: 'insensitive',
                },
              },
              {
                description: {
                  contains: criteria,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      },
      include: itemInclude,
      take: 5,
    });

    return result.map((item) => itemToEntity(item));
  }

  async create(item: CreateItemDataDto) {
    const result = await this.databaseService.item.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        itemType: item.itemType,
        effects: item.effects,
        spawnCategories: item.spawnCategories,
        rank: item.rank,
        setId: item.setId,
      },
      include: itemInclude,
    });

    if (!result) {
      return null;
    }

    return itemToEntity(result);
  }

  async update(id: string, updateItemDto: UpdateItemDataDto) {
    const result = await this.databaseService.item.update({
      where: { id },
      data: {
        name: updateItemDto.name,
        description: updateItemDto.description,
        imageUrl: updateItemDto.imageUrl,
        itemType: updateItemDto.itemType,
        effects: updateItemDto.effects,
        spawnCategories: updateItemDto.spawnCategories,
        rank: updateItemDto.rank,
        setId: updateItemDto.setId,
      },
      include: itemInclude,
    });
    if (!result) {
      return null;
    }
    return itemToEntity(result);
  }

  async delete(id: string) {
    await this.databaseService.item.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
