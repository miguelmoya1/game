import { PlaceCategory } from '../../enums';
import { Place } from '../../types';
import { ItemEntity } from './item.entity';

export class PlaceEntity implements Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly categories: PlaceCategory[] | null;
  public readonly currentItemId: string;
  public readonly currentItem: ItemEntity;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly permissions: {
    readonly alreadyClaimed: boolean;
    readonly canBeClaimed: boolean;
    readonly canCreate: boolean;
    readonly canDelete: boolean;
    readonly canEdit: boolean;
  };

  private constructor(place: Place) {
    this.id = place.id;
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.categories = place.categories;
    this.currentItemId = place.currentItemId;
    this.currentItem = place.currentItem;
    this.permissions = place.permissions;

    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.deletedAt = place.deletedAt;
  }

  public static create(place: Place) {
    return new PlaceEntity(place);
  }
}
