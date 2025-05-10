import { Inject, Injectable } from '@nestjs/common';
import { CreateItemDataDto } from '../../../../application/commands';
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
    const result = await this.databaseService.item.findUnique({
      where: {
        id,
      },
      include: itemInclude,
    });

    if (!result) {
      return null;
    }

    return itemToEntity(result);
  }

  async search(criteria: string) {
    const result = await this.databaseService.item.findMany({
      where: {
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
      include: itemInclude,
      take: 5,
    });

    return result.map((item) => itemToEntity(item));
  }

  async create(item: CreateItemDataDto) {
    const result = await this.databaseService.item.create({
      data: {
        name: item.name,
        description: item.description,
        imageUrl: item.imageUrl,
        itemType: item.itemType,
        effect: item.effect,
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
}
