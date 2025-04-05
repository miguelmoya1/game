import { Provider } from '@nestjs/common';
import {
  PLACE_USE_CASE,
  PlaceUseCase,
  PlaceUseCaseImpl,
} from '../../../core/application/use-cases';

export const placeUseCaseProvider: Provider<PlaceUseCase> = {
  provide: PLACE_USE_CASE,
  useClass: PlaceUseCaseImpl,
};
