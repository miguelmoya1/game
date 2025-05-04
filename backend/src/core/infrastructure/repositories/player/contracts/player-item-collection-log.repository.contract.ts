import { PlayerItemCollectionLogEntity } from '../../../../domain/entities';

export type Create = {
  playerId: string;
  placeId: string;
  itemId: string;
  collectionMonthYear: string;
};

export interface PlayerItemCollectionLogRepository {
  getForPlaces(
    placeIds: string[],
    monthYear?: string,
  ): Promise<PlayerItemCollectionLogEntity[]>;

  getForPlace(
    placeId: string,
    monthYear?: string,
  ): Promise<PlayerItemCollectionLogEntity[]>;

  add(create: Create): Promise<PlayerItemCollectionLogEntity>;
}

export const PLAYER_ITEM_COLLECTION_LOG_REPOSITORY = Symbol(
  'PLAYER_ITEM_COLLECTION_LOG_REPOSITORY',
);
