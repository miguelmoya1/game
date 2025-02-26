import { InjectionToken } from '@angular/core';
import { Movable } from '@game/interfaces';

export interface GameUseCase {
  setCanvasMovables(canvas: HTMLCanvasElement | null): void;
  setCanvasGrid(canvas: HTMLCanvasElement | null): void;

  addMovable(movable: Movable): void;
  removeMovable(id: string): void;
  reset(): void;
}

export const GAME_USE_CASE = new InjectionToken<GameUseCase>('GAME_USE_CASE');
