import { Point } from '../../classes/point.class';

export class Cell {
  public readonly id: string;
  public readonly order: number;
  public readonly canMove: boolean;

  public readonly coordinates: Point;
  public readonly width: number;
  public readonly height: number;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;

  constructor(user: any) {
    this.id = user.id ?? '';

    this.order = user.order ?? 0;
    this.canMove = user.canMove ?? false;

    this.width = user.width ?? 25;
    this.height = user.height ?? 25;

    this.coordinates = new Point(user.coordinates.x, user.coordinates.y);

    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
    this.deletedAt = user.deletedAt;
  }
}
