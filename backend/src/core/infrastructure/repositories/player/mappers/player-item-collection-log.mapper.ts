import { PlayerItemCollectionLog as PlayerItemCollectionLogDb } from '@prisma/client';
import { PlayerItemCollectionLogEntity } from '../../../../domain/entities';

export const playerItemCollectionLogToEntity = (
  playerItemCollectionLog: PlayerItemCollectionLogDb,
) => {
  return PlayerItemCollectionLogEntity.create({
    id: playerItemCollectionLog.id,
    playerId: playerItemCollectionLog.playerId,
    collectedAt: playerItemCollectionLog.collectedAt,
    collectionMonthYear: playerItemCollectionLog.collectionMonthYear,
    placeId: playerItemCollectionLog.placeId,
    itemId: playerItemCollectionLog.itemId,
  });
};
