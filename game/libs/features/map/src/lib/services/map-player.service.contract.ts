import { InjectionToken } from '@angular/core';
import { MapPlayerServiceImpl } from './map-player.service';

export type Position = { latitude: number; longitude: number };

export interface MapPlayerService {
  setPosition(position: Position): void;
}

export const MAP_PLAYER_SERVICE = new InjectionToken<MapPlayerService>(
  'MAP_PLAYER_SERVICE',
  {
    providedIn: 'root',
    factory: () => new MapPlayerServiceImpl(),
  },
);
