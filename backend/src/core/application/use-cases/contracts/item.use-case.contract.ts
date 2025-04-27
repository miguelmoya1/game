import { ItemEntity, UserEntity } from '../../../domain/entities';

export interface ItemUseCase {
  getById(itemId: string, user: UserEntity): Promise<ItemEntity | null>;
}

export const ITEM_USE_CASE = Symbol('ITEM_USE_CASE');
