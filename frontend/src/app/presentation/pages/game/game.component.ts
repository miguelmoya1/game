import { Component } from '@angular/core';
import { MapComponent } from './components/map/map.component';

@Component({
  selector: 'app-game',
  imports: [MapComponent],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent {}
