import { PlaceEntity } from '@game/features/places';

export interface PointDto {
  readonly lat: number;
  readonly lng: number;
  readonly placeId: string;
  readonly hasDungeon: boolean;
  readonly placePermissions: PlaceEntity['permissions'];
}
