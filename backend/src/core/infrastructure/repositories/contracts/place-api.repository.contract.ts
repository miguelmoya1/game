export interface PlaceApiRepository {
  fetchAndStorePlacesFromOverpass(
    latitude: number,
    longitude: number,
  ): Promise<void>;
}

export const PLACE_API_REPOSITORY = Symbol('PLACE_API_REPOSITORY');
