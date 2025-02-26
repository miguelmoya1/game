// import { PlayerDto } from '@game/dto';
import { Movable } from '@game/interfaces';
import { Point } from '../../classes/point.class';

export class Player implements Movable {
  public readonly id: string;
  public readonly name: string;

  public readonly position: Point;

  public readonly width: number;
  public readonly height: number;

  public readonly destination: Point;

  public readonly speed: number;
  public readonly moving: boolean;

  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date;

  constructor(user: any) {
    this.id = user.id ?? '';
    this.name = user.name ?? '';

    this.position = new Point(user.position.x, user.position.y);

    this.width = user.width ?? 0;
    this.height = user.height ?? 0;

    this.destination = new Point(user.destination.x, user.destination.y);
    this.speed = user.speed ?? 0;
    this.moving = user.moving ?? false;

    this.createdAt = user.createdAt ?? new Date();
    this.updatedAt = user.updatedAt ?? new Date();
    this.deletedAt = user.deletedAt;
  }

  public calculateMovement() {
    const distX = this.destination.x - this.position.x;
    const distY = this.destination.y - this.position.y;

    const tolerance = this.speed * 0.8;
    if (Math.abs(distX) < tolerance && Math.abs(distY) < tolerance) {
      return this.#stopMovement();
    }

    const movementX = distX > 0 ? Math.min(distX, this.speed) : Math.max(distX, -this.speed);
    const movementY = distY > 0 ? Math.min(distY, this.speed) : Math.max(distY, -this.speed);

    return this.#updatePosition(new Point(this.position.x + movementX, this.position.y + movementY));
  }

  #updatePosition(point: Point) {
    return new Player({
      ...this,
      position: point,
    });
  }

  #stopMovement() {
    return new Player({
      ...this,
      moving: false,
    });
  }
}
