import { Component, inject } from '@angular/core';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { PLAYER_SERVICE } from '../services/player.service.contract';

@Component({
  selector: 'game-player',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './player.component.html',
  styleUrl: './player.component.css',
})
export class PlayerComponent {
  readonly #playerService = inject(PLAYER_SERVICE);

  protected readonly player = this.#playerService.player;
}
