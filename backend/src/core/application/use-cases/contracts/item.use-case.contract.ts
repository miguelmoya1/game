import { Item } from '../../../domain/entities';

export interface ItemUseCase {
  getById(itemId: string): Promise<Item | null>;
}

export const ITEM_USE_CASE = Symbol('ITEM_USE_CASE');
