import { InjectionToken, WritableSignal } from '@angular/core';
import { PointEntity } from '@game/features/points';
import { Marker } from 'maplibre-gl';
import { MapPointsServiceImpl } from './map-points.service';

export type Selected = {
  readonly marker: Marker | null;
  readonly point: PointEntity | null;
};

export abstract class MapPointsService {
  abstract readonly markerSelected: WritableSignal<Selected | null>;
  abstract setPoints(points: PointEntity[]): void;
}

export const MAP_POINTS_SERVICE = new InjectionToken<MapPointsService>(
  'MAP_POINTS_SERVICE',
  {
    providedIn: 'root',
    factory: () => new MapPointsServiceImpl(),
  },
);
