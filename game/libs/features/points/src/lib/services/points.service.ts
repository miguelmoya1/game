import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { GEOLOCATION_SERVICE } from '@game/shared';
import { mapPointArrayToEntityArray } from './mappers/point.mapper';
import { PointsService } from './points.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PointsServiceImpl implements PointsService {
  readonly #geolocationService = inject(GEOLOCATION_SERVICE);

  readonly #points = httpResource(
    () =>
      this.#geolocationService.position()?.coords
        ? `points?lat=${this.#geolocationService.position()?.coords.latitude}&lng=${this.#geolocationService.position()?.coords.longitude}`
        : undefined,
    {
      defaultValue: [],
      parse: mapPointArrayToEntityArray,
    },
  );

  public readonly all = this.#points.asReadonly();
}
