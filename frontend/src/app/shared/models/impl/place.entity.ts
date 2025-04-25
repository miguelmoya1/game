import { PlaceCategory } from '../../enums';
import { Place } from '../../types';

export class PlaceEntity implements Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly osmTags: Record<string, string> | null;
  public readonly categories: PlaceCategory | null;
  public readonly currentItemId: string | null;
  public readonly currentItem: string[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  private constructor(place: Place) {
    this.id = place.id;
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.osmTags = place.osmTags;
    this.categories = place.categories;
    this.currentItemId = place.currentItemId;
    this.currentItem = place.currentItem;

    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.deletedAt = place.deletedAt;
  }

  public static create(place: Place) {
    return new PlaceEntity(place);
  }
}
