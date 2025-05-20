import { Inventory } from '../types/inventory.type';
import { ItemEntity } from './item.entity';

export class InventoryEntity implements Inventory {
  readonly id: string;
  readonly quantity: number;
  readonly isEquipped: boolean;
  readonly acquiredAt: Date;
  readonly playerId: string;
  readonly itemId: string;
  readonly item: ItemEntity;

  private constructor(inventory: Inventory) {
    this.id = inventory.id;
    this.quantity = inventory.quantity;
    this.isEquipped = inventory.isEquipped;
    this.acquiredAt = inventory.acquiredAt;
    this.playerId = inventory.playerId;
    this.itemId = inventory.itemId;
    this.item = ItemEntity.create(inventory.item);
  }

  public static create(inventory: Inventory) {
    return new InventoryEntity(inventory);
  }
}
