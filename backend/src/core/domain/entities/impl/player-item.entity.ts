import { PlayerItem } from '../../types';
import { ItemEntity } from './item.entity';

export class PlayerItemEntity implements PlayerItem {
  public readonly id: string;
  public readonly quantity: number;
  public readonly isEquipped: boolean;
  public readonly acquiredAt: Date;
  public readonly playerId: string;
  public readonly itemId: string;
  public readonly item: ItemEntity;
  public readonly createdAt: Date | null;
  public readonly updatedAt: Date | null;

  private constructor(playerItem: PlayerItem) {
    this.id = playerItem.id;
    this.quantity = playerItem.quantity;
    this.isEquipped = playerItem.isEquipped;
    this.acquiredAt = playerItem.acquiredAt;
    this.playerId = playerItem.playerId;
    this.itemId = playerItem.itemId;
    this.item = playerItem.item;
    this.createdAt = playerItem.createdAt;
    this.updatedAt = playerItem.updatedAt;
  }

  public static create(playerItem: PlayerItem) {
    return new PlayerItemEntity(playerItem);
  }
}
