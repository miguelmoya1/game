import { signal } from '@angular/core';

export abstract class CanvasDraggable {
  protected readonly canvas = signal<HTMLCanvasElement | null>(null);

  public setCanvas(canvasElement: HTMLCanvasElement | null) {
    this.canvas.set(canvasElement);
  }
}
