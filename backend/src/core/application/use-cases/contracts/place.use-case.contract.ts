import { UserEntity } from '../../../domain/entities';
import { PlaceDetailResponseDto } from '../dtos/place-detail-response.dto';
import { PlaceListResponseDto } from '../dtos/place-list-response.dto';

export interface PlaceUseCase {
  getById(
    placeId: string,
    user: UserEntity,
  ): Promise<PlaceDetailResponseDto | null>;

  getAll(
    lat: number,
    lng: number,
    user: UserEntity,
  ): Promise<PlaceListResponseDto[]>;
}

export const PLACE_USE_CASE = Symbol('PLACE_USE_CASE');
