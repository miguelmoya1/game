import { Injectable, signal } from '@angular/core';
import { Movable } from '@game/interfaces';
import { GameUseCase } from '@game/use-cases-contracts';

// TODO: separate in different files (GridUseCase and MovablesUseCase)

@Injectable()
export class GameUseCaseImpl implements GameUseCase {
  readonly #canvasMovables = signal<HTMLCanvasElement | null>(null);

  readonly #canvasGrid = signal<HTMLCanvasElement | null>(null);

  readonly #movables = signal<Movable[]>([]);
  #lastTime = 0;
  #interval = 1000 / 144; // 144 FPS

  constructor() {
    requestAnimationFrame((timestamp) => this.#animate(timestamp));
  }

  public setCanvasMovables(canvas: HTMLCanvasElement | null) {
    this.#canvasMovables.set(canvas);
  }

  public setCanvasGrid(canvas: HTMLCanvasElement | null) {
    this.#canvasGrid.set(canvas);
  }

  public addMovable(movable: Movable) {
    console.log('Adding movable', movable);
    this.#movables.update((movables) => [...movables, movable]);
  }

  public removeMovable(id: string) {
    this.#movables.update((movables) => movables.filter((movable) => movable.id !== id));
  }

  public reset() {
    this.#canvasMovables.set(null);
    this.#canvasGrid.set(null);

    this.#movables.set([]);
  }

  #animate(timestamp: number) {
    if (!this.#lastTime) {
      this.#lastTime = timestamp;
    }

    const elapsed = timestamp - this.#lastTime;

    if (elapsed > this.#interval) {
      this.#lastTime = timestamp - (elapsed % this.#interval);

      const context = this.#canvasMovables()?.getContext('2d');

      if (!context) {
        console.log('No context');
        return;
      }

      context.clearRect(0, 0, context.canvas.width, context.canvas.height);

      this.#movables().forEach((movable) => this.#drawElement(movable, context));

      const newElements = this.#movables().map((movable) => movable.calculateMovement());

      this.#movables.set(newElements);
    }

    requestAnimationFrame((timestamp) => this.#animate(timestamp));
  }

  #drawElement(element: Movable, context: CanvasRenderingContext2D) {
    if ('color' in element && typeof element.color === 'string') {
      context.fillStyle = element.color;
    } else {
      context.fillStyle = 'black';
    }

    context.fillRect(element.position.x, element.position.y, element.width, element.height);
  }
}
