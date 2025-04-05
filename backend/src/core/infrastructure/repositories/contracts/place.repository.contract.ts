import { Place } from '../../../domain/entities';
import { CreatePlaceDto } from '../../dto';

export interface PlaceRepository {
  get(latitude: number, longitude: number): Promise<Place[]>;
  findById(id: string): Promise<Place | null>;
  createMany(place: CreatePlaceDto[]): Promise<boolean>;
}

export const PLACE_REPOSITORY = Symbol('PLACE_REPOSITORY');
