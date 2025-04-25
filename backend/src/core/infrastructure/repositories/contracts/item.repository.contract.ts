import { ItemEntity } from '../../../domain/entities';

export interface ItemRepository {
  findById(id: string): Promise<ItemEntity | null>;
}

export const ITEM_REPOSITORY = Symbol('ITEM_REPOSITORY');
