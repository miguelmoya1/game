import { PlaceApi } from '../../../domain/types/place-api.types';

export interface PlaceApiRepository {
  getPlaces(
    latitude: number,
    longitude: number,
    radius?: number,
  ): Promise<PlaceApi[]>;
}

export const PLACE_API_REPOSITORY = Symbol('PLACE_API_REPOSITORY');
