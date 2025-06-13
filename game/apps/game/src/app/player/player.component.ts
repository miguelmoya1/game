import { Component, computed, inject } from '@angular/core';
import { PLAYER_SERVICE } from '@game/features/player';
import { StatsType, TitleComponent, TranslatePipe } from '@game/shared';

@Component({
  selector: 'game-player',
  imports: [TranslatePipe, TitleComponent],
  templateUrl: './player.component.html',
})
export class PlayerComponent {
  readonly #playerService = inject(PLAYER_SERVICE);

  protected readonly player = this.#playerService.player;

  protected readonly statsKeys = computed(
    () =>
      Object.keys(this.player.value()?.aggregatedStats || {}) as StatsType[],
  );
}
