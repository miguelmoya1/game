import { Inject, Injectable } from '@nestjs/common';
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
}
