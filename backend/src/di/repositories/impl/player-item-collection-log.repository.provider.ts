import { Provider } from '@nestjs/common';
import {
  PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
  PlayerItemCollectionLogRepository,
  PlayerItemCollectionLogRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const playerItemCollectionLogRepositoryProvider: Provider<PlayerItemCollectionLogRepository> =
  {
    provide: PLAYER_ITEM_COLLECTION_LOG_REPOSITORY,
    useClass: PlayerItemCollectionLogRepositoryImpl,
  };
