import { InjectionToken, Resource } from '@angular/core';
import { PlayerEntity } from '../../models/player.entity';
import { PlayerServiceImpl } from './player.service';

export interface PlayerService {
  player: Resource<PlayerEntity | undefined>;
}

export const PLAYER_SERVICE = new InjectionToken<PlayerService>(
  'PLAYER_SERVICE',
  {
    providedIn: 'root',
    factory: () => new PlayerServiceImpl(),
  }
);
