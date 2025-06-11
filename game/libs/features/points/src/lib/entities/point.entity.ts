export abstract class Point {
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

  protected constructor(point: Point) {
    this.lat = point.lat;
    this.lng = point.lng;
    this.placeId = point.placeId;
    this.hasDungeon = point.hasDungeon;
    this.placePermissions = point.placePermissions;
  }
}

export class PointEntity extends Point {
  public static create(point: Point) {
    return new PointEntity(point);
  }
}
