import { PLACE_USE_CASE, PlaceUseCaseImpl } from '@game/use-cases';

export const placeUseCaseProvider = {
  provide: PLACE_USE_CASE,
  useClass: PlaceUseCaseImpl,
};
