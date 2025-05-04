import { Provider } from '@nestjs/common';
import {
  PLAYER_ITEM_REPOSITORY,
  PlayerItemRepository,
  PlayerItemRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const playerItemRepositoryProvider: Provider<PlayerItemRepository> = {
  provide: PLAYER_ITEM_REPOSITORY,
  useClass: PlayerItemRepositoryImpl,
};
