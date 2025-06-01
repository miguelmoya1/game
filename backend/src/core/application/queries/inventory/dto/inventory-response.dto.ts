import { PlayerItem } from '../../../../domain/entities';

export class InventoryResponseDto {
  public readonly id: string;
  public readonly quantity: number;
  public readonly isEquipped: boolean;
  public readonly acquiredAt: Date;
  public readonly playerId: string;
  public readonly itemId: string;

  private constructor(props: {
    id: string;
    quantity: number;
    isEquipped: boolean;
    acquiredAt: Date;
    playerId: string;
    itemId: string;
  }) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.isEquipped = props.isEquipped;
    this.acquiredAt = props.acquiredAt;
    this.playerId = props.playerId;
    this.itemId = props.itemId;

    Object.freeze(this);
  }

  public static create(inventory: PlayerItem) {
    const dtoProps = {
      id: inventory.id,
      quantity: inventory.quantity,
      isEquipped: inventory.isEquipped,
      acquiredAt: inventory.acquiredAt,
      playerId: inventory.playerId,
      itemId: inventory.itemId,
    };

    return new InventoryResponseDto(dtoProps);
  }
}
