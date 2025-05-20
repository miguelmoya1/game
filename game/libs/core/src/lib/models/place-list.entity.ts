import { PlaceList } from '../types/place-list.type';

export class PlaceListEntity implements PlaceList {
  public readonly id: string;
  public readonly lat: number;
  public readonly lng: number;
  public readonly permissions: {
    readonly alreadyClaimed: boolean;
    readonly canBeClaimed: boolean;
    readonly canCreate: boolean;
    readonly canDelete: boolean;
    readonly canEdit: boolean;
  };

  private constructor(placeList: PlaceList) {
    this.id = placeList.id;
    this.lat = placeList.lat;
    this.lng = placeList.lng;
    this.permissions = placeList.permissions;
  }

  public static create(placeList: PlaceList) {
    return new PlaceListEntity(placeList);
  }
}
