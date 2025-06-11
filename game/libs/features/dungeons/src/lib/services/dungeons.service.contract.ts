import { InjectionToken, Resource } from '@angular/core';
import { DungeonEntity } from '../entities/dungeon.entity';
import { DungeonsServiceImpl } from './dungeons.service';

export interface DungeonsService {
  readonly dungeon: Resource<DungeonEntity | undefined>;

  setPlaceId: (id: string | null) => void;
}

export const DUNGEONS_SERVICE = new InjectionToken<DungeonsService>(
  'DUNGEONS_SERVICE',
  {
    providedIn: 'root',
    factory: () => new DungeonsServiceImpl(),
  },
);
