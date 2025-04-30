import { PlaceListEntity } from '../../../../domain/entities';
import { PlacePermissions } from '../../../services/permissions/types/place-permissions.type';

export class PlaceListResponseDto {
  public readonly id: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly permissions: PlacePermissions;

  private constructor(props: {
    id: string;
    lat: number;
    lng: number;
    permissions: PlacePermissions;
  }) {
    this.id = props.id;
    this.lat = props.lat;
    this.lng = props.lng;
    this.permissions = props.permissions;
  }

  public static create(
    place: PlaceListEntity,
    placePermissions: PlacePermissions,
  ) {
    const dtoProps = {
      id: place.id,
      lat: place.lat,
      lng: place.lng,
      permissions: placePermissions,
    };

    return new PlaceListResponseDto(dtoProps);
  }
}
