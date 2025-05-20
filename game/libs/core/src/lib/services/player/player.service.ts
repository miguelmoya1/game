import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_GLOBAL_SERVICE } from '../auth';
import { mapPlayerToEntity } from './mappers/player.mapper';
import { PlayerService } from './player.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceImpl implements PlayerService {
  readonly #authService = inject(AUTH_GLOBAL_SERVICE);

  readonly #currentPlayer = httpResource(
    () =>
      this.#authService.isAuthenticated.value() ? 'players/me' : undefined,
    {
      parse: mapPlayerToEntity,
    }
  );

  readonly player = this.#currentPlayer.asReadonly();
}
