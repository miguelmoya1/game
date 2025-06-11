import { InjectionToken, Resource, Signal } from '@angular/core';
import { DungeonEntity } from '../entities/dungeon.entity';
import { DungeonsServiceImpl } from './dungeons.service';

export interface DungeonsService {
  readonly dungeon: Resource<DungeonEntity | undefined>;
  readonly placeId: Signal<string | null>;
}

export const DUNGEONS_SERVICE = new InjectionToken<DungeonsService>(
  'DUNGEONS_SERVICE',
  {
    providedIn: 'root',
    factory: () => new DungeonsServiceImpl(),
  },
);
