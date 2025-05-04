import { httpResource } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { GeolocationService } from '@game/core/services/geolocation.service';
import { PlaceApiService } from '../data-access/place-api.service';
import { mapPlaceListArrayToEntityArray } from './mappers/place-list.mapper';
import { mapPlaceToEntity } from './mappers/place.mapper';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  readonly #geolocationService = inject(GeolocationService);
  readonly #placeApiService = inject(PlaceApiService);
  readonly #placeSelected = signal<string | null>(null);

  readonly #place = httpResource(() => (this.#placeSelected() ? `places/${this.#placeSelected()}` : undefined), {
    parse: mapPlaceToEntity,
  });

  readonly #all = httpResource(
    () => {
      const position = this.#geolocationService.position();

      if (!position?.coords) {
        return undefined;
      }

      const { latitude, longitude } = position.coords;

      return `places?lat=${latitude}&lng=${longitude}`;
    },
    { parse: mapPlaceListArrayToEntityArray, defaultValue: [] },
  );

  public readonly all = this.#all.asReadonly();
  public readonly place = this.#place.asReadonly();

  public setPlaceId(id: string | null) {
    this.#placeSelected.set(id);
  }

  public async claim() {
    const placeId = this.#placeSelected();

    if (!placeId) {
      return;
    }

    await this.#placeApiService.claim(placeId);

    this.#place.reload();
    this.#all.reload();
  }
}
