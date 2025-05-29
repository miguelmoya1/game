import { PlaceCategory } from '../../enums';

export abstract class PlaceApi {
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly osmTags: Record<string, string>;
  public readonly randomItemId: string;
  public readonly categories: PlaceCategory[];

  protected constructor(place: PlaceApi) {
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.osmTags = place.osmTags;
    this.randomItemId = place.randomItemId;
    this.categories = place.categories;
  }
}

export class PlaceApiEntity extends PlaceApi {
  public static create(place: PlaceApi) {
    return new PlaceApiEntity(place);
  }
}
