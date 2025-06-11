import { InjectionToken, Resource } from '@angular/core';
import { PointEntity } from '../entities/point.entity';
import { PointsServiceImpl } from './points.service';

export type PointsService = {
  readonly all: Resource<PointEntity[]>;
};

export const POINTS_SERVICE = new InjectionToken<PointsService>(
  'POINTS_SERVICE',
  {
    factory: () => new PointsServiceImpl(),
  },
);
