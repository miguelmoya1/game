import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GEOLOCATION_SERVICE } from '@game/shared';
import { DungeonApiService } from '../data-access/dungeon-api.service';
import { DungeonsService } from './dungeons.service.contract';
import { mapDungeonArrayToEntityArray } from './mappers/dungeon.mapper';

@Injectable()
export class DungeonsServiceImpl implements DungeonsService {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);
  readonly #dungeonApiService = inject(DungeonApiService);
  readonly #position = this.#geolocationService.position;

  readonly #all = httpResource(
    () => this.#dungeonApiService.get(this.#position() ?? undefined),
    {
      defaultValue: [],
      parse: mapDungeonArrayToEntityArray,
    },
  );

  public readonly all = this.#all.asReadonly();
}
