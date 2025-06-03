import { Component, computed, inject } from '@angular/core';
import { StatsType } from '@game/core';
import { PLAYER_SERVICE } from '@game/features/player';
import { TranslatePipe } from '@game/shared';

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

  protected readonly statsKeys = computed(
    () =>
      Object.keys(this.player.value()?.aggregatedStats || {}) as StatsType[],
  );
}
