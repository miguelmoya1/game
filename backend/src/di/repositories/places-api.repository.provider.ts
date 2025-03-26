import { PLACES_API_REPOSITORY } from '../../core/domain/interfaces/places-api.repository.ts';
import { PlacesApiRepositoryImpl } from '../../core/infrastructure/repositories/places-api.repository.ts';
import type { Provider } from '../di-manager.ts';

export const placesApiRepositoryProvider: Provider = {
  provide: PLACES_API_REPOSITORY,
  useClass: PlacesApiRepositoryImpl,
};
