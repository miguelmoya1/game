import { PlaceCategory } from '../../enums';
import { PlaceApi } from '../../types';

export class PlaceApiEntity implements PlaceApi {
  declare public readonly apiId: string;
  declare public readonly name: string;
  declare public readonly lat: number;
  declare public readonly lng: number;
  declare public readonly osmTags: Record<string, string>;
  declare public readonly randomItemId: string;
  declare public readonly categories: PlaceCategory[];

  private constructor(place: PlaceApi) {
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.osmTags = place.osmTags;
    this.randomItemId = place.randomItemId;
    this.categories = place.categories;
  }

  public static create(place: PlaceApi) {
    return new PlaceApiEntity(place);
  }
}
