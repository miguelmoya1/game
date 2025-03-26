import { SymbolRef } from '../../../di/di-manager.ts';
import { Place } from '../entities/place.entity.ts';

export interface PlacesRepository {
  get(latitude: number, longitude: number): Promise<Place[]>;
}

export const PLACES_REPOSITORY = new SymbolRef<PlacesRepository>(Symbol('PLACES_REPOSITORY'));
