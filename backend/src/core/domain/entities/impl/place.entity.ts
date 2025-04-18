import { PlaceCategory } from '@prisma/client';

export class Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly osmTags: Record<string, string> | null;
  public readonly categories: PlaceCategory[];
  public readonly currentItemId: string | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(
    account: Pick<
      Place,
      | 'id'
      | 'apiId'
      | 'name'
      | 'lat'
      | 'lng'
      | 'osmTags'
      | 'categories'
      | 'currentItemId'
      | 'createdAt'
      | 'updatedAt'
      | 'deletedAt'
    >,
  ) {
    this.id = account.id;
    this.apiId = account.apiId;

    this.name = account.name;
    this.lat = account.lat;
    this.lng = account.lng;

    this.osmTags = account.osmTags;
    this.categories = account.categories;
    this.currentItemId = account.currentItemId;

    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
    this.deletedAt = account.deletedAt;
  }
}
