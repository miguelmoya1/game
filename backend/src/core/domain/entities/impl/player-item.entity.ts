import { PlayerItem } from '../../types';

export class PlayerItemEntity implements PlayerItem {
  public readonly id: string;
  public readonly quantity: number;
  public readonly isEquipped: boolean;
  public readonly acquiredAt: Date;
  public readonly playerId: string;
  public readonly itemId: string;

  private constructor(playerItem: PlayerItem) {
    this.id = playerItem.id;
    this.quantity = playerItem.quantity;
    this.isEquipped = playerItem.isEquipped;
    this.acquiredAt = playerItem.acquiredAt;
    this.playerId = playerItem.playerId;
    this.itemId = playerItem.itemId;
  }

  public static create(playerItem: PlayerItem) {
    return new PlayerItemEntity(playerItem);
  }
}
