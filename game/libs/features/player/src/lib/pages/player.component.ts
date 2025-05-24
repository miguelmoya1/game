import { Component, computed, inject } from '@angular/core';
import { TranslatePipe } from '@game/shared';
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

  protected readonly statsKeys = computed(() =>
    Object.keys(this.player.value()?.aggregatedStats || {}),
  );
}
