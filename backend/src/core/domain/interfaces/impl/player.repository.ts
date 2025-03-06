import { CreatePlayerDto } from '@game/data/dto';
import { Player } from '@game/entities';

export interface PlayerRepository {
  findById(id: string): Promise<Player | null>;
  create(player: CreatePlayerDto): Promise<Player | null>;
}

export const PLAYER_REPOSITORY = Symbol('PLAYER_REPOSITORY');
