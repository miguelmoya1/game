import { Provider } from '@nestjs/common';
import { PLACE_REPOSITORY, PlaceRepository, PlaceRepositoryImpl } from '../../../core/infrastructure/repositories';

export const placeRepositoryProvider: Provider<PlaceRepository> = {
  provide: PLACE_REPOSITORY,
  useClass: PlaceRepositoryImpl,
};
