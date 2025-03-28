export enum PlaceAmenity {
  PLACE_OF_WORSHIP = 'place_of_worship',
}

export class Place {
  public readonly id: string;
  public readonly apiId: number;
  public readonly name: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly addressName: string | null;
  public readonly amenity: PlaceAmenity | null;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  constructor(
    account: Pick<
      Place,
      'id' | 'apiId' | 'name' | 'lat' | 'lng' | 'addressName' | 'amenity' | 'createdAt' | 'updatedAt' | 'deletedAt'
    >,
  ) {
    this.id = account.id;
    this.apiId = account.apiId;

    this.name = account.name;
    this.lat = account.lat;
    this.lng = account.lng;
    this.addressName = account.addressName;
    this.amenity = account.amenity;

    this.createdAt = account.createdAt;
    this.updatedAt = account.updatedAt;
    this.deletedAt = account.deletedAt;
  }
}
