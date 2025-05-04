import { Item } from './item.type';

export type PlayerItem = {
  readonly id: string;
  readonly quantity: number;
  readonly isEquipped: boolean;
  readonly acquiredAt: Date;

  readonly playerId: string;
  readonly itemId: string;
  readonly item: Item;
  readonly createdAt: Date | null;
  readonly updatedAt: Date | null;
};
