import { Place } from '../../../domain/entities';

export interface PlaceRepository {
  get(latitude: number, longitude: number): Promise<Place[]>;
  findById(id: string): Promise<Place | null>;
}

export const PLACE_REPOSITORY = Symbol('PLACE_REPOSITORY');
