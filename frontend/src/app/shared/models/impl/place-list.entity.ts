import { PlaceList } from '../../types/impl/place-list.type';

export class PlaceListEntity implements PlaceList {
  public readonly id: string;
  public readonly lat: number;
  public readonly lng: number;

  private constructor(placeList: PlaceList) {
    this.id = placeList.id;
    this.lat = placeList.lat;
    this.lng = placeList.lng;
  }

  public static create(placeList: PlaceList): PlaceListEntity {
    return new PlaceListEntity(placeList);
  }
}
