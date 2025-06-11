import { InjectionToken, Resource } from '@angular/core';
import { PointListEntity } from '../entities/point-list.entity';
import { PointsServiceImpl } from './points.service';

export type PointsService = {
  readonly points: Resource<PointListEntity[]>;
};

export const POINTS_SERVICE = new InjectionToken<PointsService>(
  'POINTS_SERVICE',
  {
    factory: () => new PointsServiceImpl(),
  },
);
