import { CreateItemDataDto } from '../../../../application/commands';
import { ItemEntity } from '../../../../domain/entities';

export interface ItemRepository {
  findById(id: string): Promise<ItemEntity | null>;
  search(criteria: string): Promise<ItemEntity[]>;

  create(item: CreateItemDataDto): Promise<ItemEntity | null>;
}

export const ITEM_REPOSITORY = Symbol('ITEM_REPOSITORY');
