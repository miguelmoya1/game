import { PLACE_REPOSITORY, PlaceRepositoryImpl } from '@game/repositories';

export const placeRepositoryProvider = {
  provide: PLACE_REPOSITORY,
  useClass: PlaceRepositoryImpl,
};
