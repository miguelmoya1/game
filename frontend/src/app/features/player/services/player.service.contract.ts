import { InjectionToken, Resource } from '@angular/core';
import { PlayerEntity } from '../../../shared/models/impl/player.entity';
import { PlayerServiceImpl } from './player.service';

export abstract class PlayerService {
  abstract readonly player: Resource<PlayerEntity | undefined>;
}

export const PLAYER_SERVICE = new InjectionToken<PlayerService>('PLAYER_SERVICE', {
  factory: () => new PlayerServiceImpl(),
});
