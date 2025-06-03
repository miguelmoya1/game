export abstract class Inventory {
  public readonly id: string;
  public readonly quantity: number;
  public readonly isEquipped: boolean;
  public readonly acquiredAt: Date;
  public readonly playerId: string;
  public readonly itemId: string;

  protected constructor(inventory: Inventory) {
    this.id = inventory.id;
    this.quantity = inventory.quantity;
    this.isEquipped = inventory.isEquipped;
    this.acquiredAt = inventory.acquiredAt;
    this.playerId = inventory.playerId;
    this.itemId = inventory.itemId;
  }
}

export class InventoryEntity extends Inventory {
  public static create(inventory: Inventory) {
    return new InventoryEntity(inventory);
  }
}
