export class Place {
  public readonly id: string;
  public readonly apiId: string;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly osmTags: Record<string, string> | null;
  public readonly categories: string[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(
    place: Pick<
      Place,
      'id' | 'apiId' | 'name' | 'lat' | 'lng' | 'osmTags' | 'categories' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ) {
    this.id = place.id;
    this.apiId = place.apiId;
    this.name = place.name;
    this.lat = place.lat;
    this.lng = place.lng;
    this.osmTags = place.osmTags;
    this.categories = place.categories;
    this.createdAt = place.createdAt;
    this.updatedAt = place.updatedAt;
    this.deletedAt = place.deletedAt;
  }
}
