import { PLAYER_REPOSITORY, PlayerRepository } from '@game/interfaces';
import { PlayerRepositoryImpl } from '@game/repositories';
import { Provider } from '@nestjs/common';

export const playerRepositoryProvider: Provider<PlayerRepository> = {
  provide: PLAYER_REPOSITORY,
  useClass: PlayerRepositoryImpl,
};
