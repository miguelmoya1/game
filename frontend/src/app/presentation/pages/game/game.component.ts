import { Component, effect, ElementRef, inject, viewChild } from '@angular/core';
import { GAME_USE_CASE } from '@game/use-cases-contracts';
import { Player } from 'src/app/core/domain/entities/impl/player.entity';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  readonly #gameUseCase = inject(GAME_USE_CASE);
  protected readonly canvasCharacters = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasCharacters');
  protected readonly canvasGrid = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasGrid');

  constructor() {
    effect((cleanup) => {
      this.#gameUseCase.setCanvasMovables(this.canvasCharacters().nativeElement);
      this.#gameUseCase.setCanvasGrid(this.canvasGrid().nativeElement);

      cleanup(() => {
        this.#gameUseCase.setCanvasMovables(null);
        this.#gameUseCase.setCanvasGrid(null);
      });
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.#gameUseCase.addMovable(
        new Player({
          position: { x: 0, y: 0 },
          width: 10,
          height: 10,
          destination: { x: 1000, y: 1000 },
          speed: 1,
          moving: true,
        }),
      );
    }, 1000);
  }
}
