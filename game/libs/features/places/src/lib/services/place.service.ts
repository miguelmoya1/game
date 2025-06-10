import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GEOLOCATION_SERVICE } from '@game/shared';
import { PlaceApiService } from '../data-access/place-api.service';
import { mapPlaceListArrayToEntityArray } from './mappers/place-list.mapper';
import { mapPlaceToEntity } from './mappers/place.mapper';
import { PlaceService } from './place.service.contract';

@Injectable()
export class PlaceServiceImpl implements PlaceService {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);
  readonly #placeApiService = inject(PlaceApiService);
  readonly #placeSelected = signal<string | undefined>(undefined);

  readonly #place = httpResource(
    () => this.#placeApiService.prepareUrl(this.#placeSelected()),
    { parse: mapPlaceToEntity },
  );

  readonly #list = httpResource(
    () =>
      this.#placeApiService.get(
        this.#geolocationService.position() ?? undefined,
      ),
    { parse: mapPlaceListArrayToEntityArray, defaultValue: [] },
  );

  public readonly list = this.#list.asReadonly();
  public readonly place = this.#place.asReadonly();

  public setPlaceId(id?: string) {
    this.#placeSelected.set(id);
  }

  public async claim() {
    const placeId = this.#placeSelected();

    if (!placeId) {
      return;
    }

    await this.#placeApiService.claim(placeId);

    this.#place.reload();
    this.#list.reload();
  }
}
