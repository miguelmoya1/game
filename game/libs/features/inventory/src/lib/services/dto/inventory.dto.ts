import { Item } from '@game/core';

export type InventoryDto = {
  acquiredAt: string;
  id: string;
  isEquipped: boolean;
  item: Item;
  itemId: string;
  playerId: string;
  quantity: number;
};
