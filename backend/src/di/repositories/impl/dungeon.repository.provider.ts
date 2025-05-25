import { Provider } from '@nestjs/common';
import {
  DUNGEON_REPOSITORY,
  DungeonRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const dungeonRepositoryProvider: Provider = {
  provide: DUNGEON_REPOSITORY,
  useClass: DungeonRepositoryImpl,
};
