import { Stats } from '../../../../domain/enums';
import { CreatePlayerDataDto } from '../../../../application/commands';
import { PlayerEntity } from '../../../../domain/entities';

export type Create = CreatePlayerDataDto & {
  stats: Stats[];
  raceId: string;
};

export interface PlayerRepository {
  getById(playerId: string): Promise<PlayerEntity | null>;
  getByUserId(userId: string): Promise<PlayerEntity | null>;
  getByIds(playerIds: string[]): Promise<PlayerEntity[]>;

  create(player: Create): Promise<PlayerEntity>;
}

export const PLAYER_REPOSITORY = Symbol('PLAYER_REPOSITORY');
