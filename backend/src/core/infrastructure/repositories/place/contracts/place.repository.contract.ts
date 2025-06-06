import { PlaceEntity, PlaceListEntity } from '../../../../domain/entities';
import { PlaceCategory } from '../../../../domain/enums';

export interface PlaceRepository {
  get(latitude: number, longitude: number): Promise<PlaceListEntity[]>;
  findById(id: string): Promise<PlaceEntity | null>;
  search(criteria: string): Promise<PlaceEntity[]>;
  delete(id: string): Promise<void>;

  getAll(): Promise<{ id: string; categories: PlaceCategory[] }[]>;
  updateCurrentItem(id: string, currentItemId: string): Promise<void>;
}

export const PLACE_REPOSITORY = Symbol('PLACE_REPOSITORY');
