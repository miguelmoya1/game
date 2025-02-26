import { Point } from '../../classes/point.class';

export interface Movable {
  id: string;
  position: Point;

  width: number;
  height: number;

  destination: Point;

  speed: number;

  moving: boolean;

  calculateMovement(): Movable;
}
