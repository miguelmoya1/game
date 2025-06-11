import { PlaceEntity } from '@game/features/places';

export interface PointListDto {
  readonly lat: number;
  readonly lng: number;
  readonly placeId: string;
  readonly hasDungeon: boolean;
  readonly placePermissions: PlaceEntity['permissions'];
}
