import { SymbolRef } from '../../../di/di-manager.ts';

export interface PlacesApiRepository {
  // TODO: Type this
  getPlaces(latitude: number, longitude: number, radius?: number): Promise<unknown[]>;
}

export const PLACES_API_REPOSITORY = new SymbolRef<PlacesApiRepository>(Symbol('PLACES_API_REPOSITORY'));
