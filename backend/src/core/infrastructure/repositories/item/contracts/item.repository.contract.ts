import { CreateItemDataDto, UpdateItemDataDto } from '../../../../application/commands';
import { ItemEntity } from '../../../../domain/entities';

export interface ItemRepository {
  getAll(): Promise<ItemEntity[]>;

  create(item: CreateItemDataDto): Promise<boolean>;
  update(id: string, updateItemDto: UpdateItemDataDto): Promise<boolean>;
  delete(id: string): Promise<boolean>;
}

export const ITEM_REPOSITORY = Symbol('ITEM_REPOSITORY');
