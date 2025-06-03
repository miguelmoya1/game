export abstract class PlaceList {
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

  protected constructor(placeList: PlaceList) {
    this.id = placeList.id;
    this.lat = placeList.lat;
    this.lng = placeList.lng;
    this.permissions = placeList.permissions;
  }
}

export class PlaceListEntity extends PlaceList {
  public static create(placeList: PlaceList) {
    return new PlaceListEntity(placeList);
  }
}
