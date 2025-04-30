import { PlaceCategory } from '@prisma/client';
import { PlaceEntity } from '../../../../domain/entities';
import { ItemPermissions } from '../../../services/permissions/types/item-permissions.type';
import { PlacePermissions } from '../../../services/permissions/types/place-permissions.type';
import { ItemResponseDto } from '../../item/dto/item-response.dto';

export class PlaceDetailResponseDto {
  public readonly id: string;
  public readonly apiId: string | null;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly categories: PlaceCategory[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  public readonly permissions: PlacePermissions;

  public readonly currentItem: ItemResponseDto | null;

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
    currentItem: ItemResponseDto | null;
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
    this.currentItem = props.currentItem;
  }

  public static create(
    place: PlaceEntity,
    placePermissions: PlacePermissions,
    itemPermissions: ItemPermissions,
  ) {
    const currentItemDto = ItemResponseDto.create(
      place.currentItem,
      itemPermissions,
    );

    const dtoProps = {
      id: place.id,
      apiId: place.apiId,
      name: place.name,
      lat: place.lat,
      lng: place.lng,
      categories: place.categories,
      createdAt: place.createdAt,
      updatedAt: place.updatedAt,
      deletedAt: place.deletedAt,

      permissions: placePermissions,

      currentItem: currentItemDto,
    };

    return new PlaceDetailResponseDto(dtoProps);
  }
}
