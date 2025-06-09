import { InjectionToken, Resource } from '@angular/core';
import { DungeonEntity } from '../entities/dungeon.entity';
import { DungeonsServiceImpl } from './dungeons.service';

export interface DungeonsService {
  readonly all: Resource<DungeonEntity[]>;
}

export const DUNGEONS_SERVICE = new InjectionToken<DungeonsService>(
  'DUNGEONS_SERVICE',
  {
    providedIn: 'root',
    factory: () => new DungeonsServiceImpl(),
  },
);
