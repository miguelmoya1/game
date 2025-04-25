import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GeolocationService } from '@game/core/services/geolocation.service';
import { mapPlaceListArrayToEntityArray } from './mappers/place-list.mapper';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  readonly #geolocationService = inject(GeolocationService);

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
}
