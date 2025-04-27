import { PlaceList } from '../../types';

export class PlaceListEntity implements PlaceList {
  public readonly id: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly currentItemId?: string;

  private constructor(placeList: PlaceList) {
    this.id = placeList.id;
    this.lat = placeList.lat;
    this.lng = placeList.lng;
    this.currentItemId = placeList.currentItemId;
  }

  public static create(placeList: PlaceList) {
    return new PlaceListEntity(placeList);
  }
}
