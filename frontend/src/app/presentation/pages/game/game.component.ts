import { Component, inject } from '@angular/core';
import { PLACE_USE_CASE } from '../../../core/application/use-cases';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-game',
  imports: [MapComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {
  readonly #placeUseCase = inject(PLACE_USE_CASE);
}
