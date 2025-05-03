import { PlayerEntity } from '../../../../domain/entities';

export interface PlayerRepository {
  getById(playerId: string): Promise<PlayerEntity | null>;
  getByUserId(userId: string): Promise<PlayerEntity | null>;
}

export const PLAYER_REPOSITORY = Symbol('PLAYER_REPOSITORY');
