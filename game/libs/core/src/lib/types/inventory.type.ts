import { Item } from './item.type';

export type Inventory = {
  readonly id: string;
  readonly quantity: number;
  readonly isEquipped: boolean;
  readonly acquiredAt: Date;
  readonly playerId: string;
  readonly itemId: string;
  readonly item: Item;
};
