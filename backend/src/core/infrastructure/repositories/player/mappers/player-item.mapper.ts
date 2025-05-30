import { PlayerItem, PlayerItemEntity } from '../../../../domain/entities';

export const playerItemToEntity = (playerItem: PlayerItem) => {
  return PlayerItemEntity.create({
    id: playerItem.id,
    quantity: playerItem.quantity,
    isEquipped: playerItem.isEquipped,
    acquiredAt: playerItem.acquiredAt,
    playerId: playerItem.playerId,
    itemId: playerItem.itemId,
    createdAt: playerItem.createdAt,
    updatedAt: playerItem.updatedAt,
  });
};
