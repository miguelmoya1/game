import { Place } from '../../../domain/entities';

export interface PlaceUseCase {
  getById(placeId: string): Promise<Place | null>;
  getAll(lat: number, lng: number): Promise<Place[]>;
}

export const PLACE_USE_CASE = Symbol('PLACE_USE_CASE');
