import { httpResource } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { mapPointListArrayToEntityArray } from './mappers/point-list.mapper';
import { PointsService } from './points.service.contract';

@Injectable({
  providedIn: 'root',
})
export class PointsServiceImpl implements PointsService {
  readonly #points = httpResource('points', {
    defaultValue: [],
    parse: mapPointListArrayToEntityArray,
  });

  public readonly points = this.#points.asReadonly();
}

// TODO: cambiar el map-places por points y poner la logiva del click
