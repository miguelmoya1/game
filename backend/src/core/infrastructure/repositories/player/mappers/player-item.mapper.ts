import { PlayerItemEntity } from '../../../../domain/entities';
import { itemToEntity } from '../../item/mappers/item.mapper';
import { PlayerIncludePayload } from '../utils/player-includes';

export const playerItemToEntity = (playerItem: PlayerIncludePayload) => {
  return PlayerItemEntity.create({
    id: playerItem.id,
    quantity: playerItem.quantity,
    isEquipped: playerItem.isEquipped,
    acquiredAt: playerItem.acquiredAt,
    playerId: playerItem.playerId,
    itemId: playerItem.itemId,
    item: itemToEntity(playerItem.item),
    createdAt: playerItem.createdAt,
    updatedAt: playerItem.updatedAt,
  });
};
