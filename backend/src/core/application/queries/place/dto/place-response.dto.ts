import { PlaceCategory } from '@prisma/client';
import { PlaceEntity } from '../../../../domain/entities';
import { PlacePermissions } from '../../../services';

export class PlaceDetailResponseDto {
  public readonly id: string;
  public readonly apiId: string | null;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly categories: PlaceCategory[];
  public readonly currentItemId: string | null;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly permissions: PlacePermissions;

  private constructor(props: {
    id: string;
    apiId: string | null;
    name: string;
    lat: number;
    lng: number;
    categories: PlaceCategory[];
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    permissions: PlacePermissions;
    currentItemId?: string | null;
  }) {
    this.id = props.id;
    this.apiId = props.apiId;
    this.name = props.name;
    this.lat = props.lat;
    this.lng = props.lng;
    this.categories = props.categories;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
    this.permissions = props.permissions;
    this.currentItemId = props.currentItemId ?? null;
  }

  public static create(place: PlaceEntity, placePermissions: PlacePermissions) {
    const dtoProps = {
      id: place.id,
      apiId: place.apiId,
      name: place.name,
      lat: place.lat,
      lng: place.lng,
      categories: place.categories,
      currentItemId: place.currentItemId ?? null,
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
      deletedAt: place.deletedAt,

      permissions: placePermissions,
    };

    return new PlaceDetailResponseDto(dtoProps);
  }
}
