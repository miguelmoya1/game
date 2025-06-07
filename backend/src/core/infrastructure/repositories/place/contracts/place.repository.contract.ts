import { PlaceEntity, PlaceListEntity } from '../../../../domain/entities';

export interface PlaceRepository {
  get(latitude: number, longitude: number): Promise<PlaceListEntity[]>;
  findById(id: string): Promise<PlaceEntity | null>;
  search(criteria: string): Promise<PlaceEntity[]>;
  delete(id: string): Promise<void>;

  getAll(
    offset: number,
    limit: number,
  ): Promise<Pick<PlaceEntity, 'id' | 'categories'>[]>;
  getCount(): Promise<number>;
  updateMany(data: Pick<PlaceEntity, 'id' | 'currentItemId'>[]): Promise<void>;
}

export const PLACE_REPOSITORY = Symbol('PLACE_REPOSITORY');
