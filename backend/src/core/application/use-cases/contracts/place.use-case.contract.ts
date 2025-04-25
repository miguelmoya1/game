import { PlaceEntity, PlaceListEntity } from '../../../domain/entities';

export interface PlaceUseCase {
  getById(placeId: string): Promise<PlaceEntity | null>;
  getAll(lat: number, lng: number): Promise<PlaceListEntity[]>;
}

export const PLACE_USE_CASE = Symbol('PLACE_USE_CASE');
