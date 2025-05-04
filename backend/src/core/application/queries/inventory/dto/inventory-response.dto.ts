import { PlayerItem } from '../../../../domain/types';
import { ItemResponseDto } from '../../item/dto/item-response.dto';

export class InventoryResponseDto {
  public readonly id: string;
  public readonly quantity: number;
  public readonly isEquipped: boolean;
  public readonly acquiredAt: Date;
  public readonly playerId: string;
  public readonly itemId: string;
  public readonly item: ItemResponseDto;

  private constructor(props: {
    id: string;
    quantity: number;
    isEquipped: boolean;
    acquiredAt: Date;
    playerId: string;
    itemId: string;
    item: ItemResponseDto;
  }) {
    this.id = props.id;
    this.quantity = props.quantity;
    this.isEquipped = props.isEquipped;
    this.acquiredAt = props.acquiredAt;
    this.playerId = props.playerId;
    this.itemId = props.itemId;
    this.item = props.item;

    Object.freeze(this);
  }

  public static create(inventory: PlayerItem, item: ItemResponseDto) {
    const dtoProps = {
      id: inventory.id,
      quantity: inventory.quantity,
      isEquipped: inventory.isEquipped,
      acquiredAt: inventory.acquiredAt,
      playerId: inventory.playerId,
      itemId: inventory.itemId,
      item,
    };

    return new InventoryResponseDto(dtoProps);
  }
}
