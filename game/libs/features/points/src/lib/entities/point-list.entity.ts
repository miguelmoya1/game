export abstract class PointList {
  public readonly lat: number;
  public readonly lng: number;
  public readonly placeId: string;
  public readonly hasDungeon: boolean;
  public readonly placePermissions: {
    readonly alreadyClaimed: boolean;
    readonly canBeClaimed: boolean;
    readonly canCreate: boolean;
    readonly canDelete: boolean;
    readonly canEdit: boolean;
  };

  protected constructor(pointList: PointList) {
    this.lat = pointList.lat;
    this.lng = pointList.lng;
    this.placeId = pointList.placeId;
    this.hasDungeon = pointList.hasDungeon;
    this.placePermissions = pointList.placePermissions;
  }
}

export class PointListEntity extends PointList {
  public static create(pointList: PointList) {
    return new PointListEntity(pointList);
  }
}
