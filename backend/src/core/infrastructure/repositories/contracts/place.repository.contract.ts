import { PlaceEntity, PlaceListEntity } from '../../../domain/entities';

export interface PlaceRepository {
  get(latitude: number, longitude: number): Promise<PlaceListEntity[]>;
  findById(id: string): Promise<PlaceEntity | null>;
}

export const PLACE_REPOSITORY = Symbol('PLACE_REPOSITORY');
