import { Item } from '../../../domain/entities';

export interface ItemRepository {
  findById(id: string): Promise<Item | null>;
}

export const ITEM_REPOSITORY = Symbol('ITEM_REPOSITORY');
