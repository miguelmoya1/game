import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import { itemToEntity } from '../../mappers';
import { ItemRepository } from '../contracts/item.repository.contract';

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
      include: {
        statBonuses: true,
        set: true,
      },
    });

    if (!result) {
      return null;
    }

    return itemToEntity(result);
  }
}
