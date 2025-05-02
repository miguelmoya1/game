import { Provider } from '@nestjs/common';
import {
  PLAYER_REPOSITORY,
  PlayerRepository,
  PlayerRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const playerRepositoryProvider: Provider<PlayerRepository> = {
  provide: PLAYER_REPOSITORY,
  useClass: PlayerRepositoryImpl,
};
