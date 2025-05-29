export abstract class PlaceList {
  public readonly id: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly currentItemId?: string;

  protected constructor(placeList: PlaceList) {
    this.id = placeList.id;
    this.lat = placeList.lat;
    this.lng = placeList.lng;
    this.currentItemId = placeList.currentItemId;
  }
}

export class PlaceListEntity extends PlaceList {
  public static create(placeList: PlaceList) {
    return new PlaceListEntity(placeList);
  }
}
