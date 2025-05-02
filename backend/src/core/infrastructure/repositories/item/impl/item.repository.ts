import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { ItemRepository } from '../contracts/item.repository.contract';
import { itemForPlaceToEntity } from '../mappers/item.mapper';
import { itemForPlaceInclude } from '../utils/item-includes';

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
      include: itemForPlaceInclude,
    });

    if (!result) {
      return null;
    }

    return itemForPlaceToEntity(result);
  }
}
