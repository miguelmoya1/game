import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { DungeonsService } from './dungeons.service.contract';
import { mapDungeonDtoToEntity } from './mappers/dungeon.mapper';

@Injectable()
export class DungeonsServiceImpl implements DungeonsService {
  readonly #placeId = signal<string | null>(null);
  readonly #dungeonResource = httpResource(
    () => (this.#placeId() ? `dungeons/${this.#placeId()}` : undefined),
    { parse: mapDungeonDtoToEntity },
  );

  public readonly dungeon = this.#dungeonResource.asReadonly();

  public setPlaceId(id: string | null): void {
    this.#placeId.set(id);
  }
}
