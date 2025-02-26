import { InjectionToken } from '@angular/core';

export interface GridUseCase {
  setCanvas(canvas: HTMLCanvasElement | null): void;

  reset(): void;
}

export const GRID_USE_CASE = new InjectionToken<GridUseCase>('GRID_USE_CASE');
