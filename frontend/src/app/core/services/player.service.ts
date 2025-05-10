import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthGlobalService } from './auth-global.service';
import { mapPlayerToEntity } from './mappers/player.mapper';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly #authService = inject(AuthGlobalService);

  readonly #currentPlayer = httpResource(() => (this.#authService.isAuthenticated.value() ? 'players/me' : undefined), {
    parse: mapPlayerToEntity,
  });

  readonly player = this.#currentPlayer.asReadonly();
}
