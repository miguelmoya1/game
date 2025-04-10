import { PlaceCategory } from '@prisma/client';

export class PlaceApi {
  declare public readonly apiId: string;
  declare public readonly name: string;
  declare public readonly lat: number;
  declare public readonly lng: number;
  declare public readonly osmTags: Record<string, string>;
  declare public readonly randomItemId: string;
  declare public readonly categories: PlaceCategory[];

  constructor(
    account: Pick<
      PlaceApi,
      'apiId' | 'name' | 'lat' | 'lng' | 'osmTags' | 'categories'
    >,
  ) {
    this.apiId = account.apiId;
    this.name = account.name;
    this.lat = account.lat;
    this.lng = account.lng;
    this.osmTags = account.osmTags;
    this.categories = account.categories;
  }
}
