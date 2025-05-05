import { Item } from '../../../../shared/types';

export type InventoryDto = {
  acquiredAt: string;
  id: string;
  isEquipped: boolean;
  item: Item;
  itemId: string;
  playerId: string;
  quantity: number;
};
