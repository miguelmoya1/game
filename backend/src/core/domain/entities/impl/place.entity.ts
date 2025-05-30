import { JsonValue } from '@prisma/client/runtime/library';
import { PlaceCategory } from '../../enums';

export abstract class Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly osmTags: JsonValue;
  public readonly categories: PlaceCategory[];
  public readonly currentItemId: string;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected constructor(place: Place) {
    this.id = place.id;
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.osmTags = place.osmTags;
    this.categories = place.categories;
    this.currentItemId = place.currentItemId;
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
