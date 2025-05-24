import { PlayerItemEntity } from '../../../../domain/entities';

export interface PlayerItemRepository {
  getForPlayer(playerId: string): Promise<PlayerItemEntity[]>;
  getForPlayerIds(playerIds: string[]): Promise<PlayerItemEntity[]>;

  add(playerId: string, itemId: string): Promise<PlayerItemEntity>;
}

export const PLAYER_ITEM_REPOSITORY = Symbol('PLAYER_ITEM_REPOSITORY');
