import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { mapPlayerToEntity } from './mappers/player.mapper';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  readonly #authService = inject(AuthService);

  readonly #currentPlayer = httpResource(() => (this.#authService.isAuthenticated.value() ? 'players/me' : undefined), {
    parse: mapPlayerToEntity,
  });

  readonly player = this.#currentPlayer.asReadonly();
}
