import { Provider } from '@nestjs/common';
import {
  PLACE_API_HISTORY_REPOSITORY,
  PlaceApiHistoryRepository,
  PlaceApiHistoryRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const placeApiHistoryRepositoryProvider: Provider<PlaceApiHistoryRepository> = {
  provide: PLACE_API_HISTORY_REPOSITORY,
  useClass: PlaceApiHistoryRepositoryImpl,
};
