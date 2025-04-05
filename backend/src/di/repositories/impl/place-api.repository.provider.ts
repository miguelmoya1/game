import { Provider } from '@nestjs/common';
import {
  PLACE_API_REPOSITORY,
  PlaceApiRepository,
  PlaceApiRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const placeApiRepositoryProvider: Provider<PlaceApiRepository> = {
  provide: PLACE_API_REPOSITORY,
  useClass: PlaceApiRepositoryImpl,
};
