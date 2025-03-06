import { Component, ElementRef, viewChild } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  protected readonly canvasCharacters = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasCharacters');
  protected readonly canvasGrid = viewChild.required<ElementRef<HTMLCanvasElement>>('canvasGrid');
}
