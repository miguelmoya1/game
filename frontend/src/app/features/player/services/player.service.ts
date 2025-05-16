import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapPlayerToEntity } from './mappers/player.mapper';
import { PlayerService } from './player.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PlayerServiceImpl implements PlayerService {
  readonly #playerResource = httpResource(() => 'players/me', {
    parse: mapPlayerToEntity,
  });

  public readonly player = this.#playerResource.asReadonly();
}
