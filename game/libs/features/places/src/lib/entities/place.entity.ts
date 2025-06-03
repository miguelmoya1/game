import { PlaceCategory } from '../enums/place-category.enum';

export abstract class Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly categories: PlaceCategory[] | null;
  public readonly currentItemId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;
  public readonly permissions: {
    readonly canEdit: boolean;
    readonly canDelete: boolean;
    readonly canCreate: boolean;
    readonly canBeClaimed: boolean;
    readonly alreadyClaimed: boolean;
  };

  protected constructor(place: Place) {
    this.id = place.id;
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.categories = place.categories;
    this.currentItemId = place.currentItemId;

    this.permissions = place.permissions;

    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.deletedAt = place.deletedAt;
  }
}

export class PlaceEntity extends Place {
  public static create(place: Place) {
    return new PlaceEntity(place);
  }
}
