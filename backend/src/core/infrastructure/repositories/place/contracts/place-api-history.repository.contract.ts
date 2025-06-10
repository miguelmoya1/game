export interface PlaceApiHistoryRepository {
  shouldRequestApi(latitude: number, longitude: number, radius?: number): Promise<boolean>;
  create(latitude: number, longitude: number, radius?: number): Promise<boolean>;
}

export const PLACE_API_HISTORY_REPOSITORY = Symbol('PLACE_API_HISTORY_REPOSITORY');
