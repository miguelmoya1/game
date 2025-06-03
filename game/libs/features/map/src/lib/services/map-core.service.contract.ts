import { InjectionToken, Signal } from '@angular/core';
import { Map } from 'maplibre-gl';
import { MapCoreServiceImpl } from './map-core.service';

export interface MapCoreService {
  setMap(element: HTMLElement): void;
  setCenter(position: { latitude: number; longitude: number }): void;
  readonly map: Signal<Map | null>;
}

export const MAP_CORE_SERVICE = new InjectionToken<MapCoreService>(
  'MAP_CORE_SERVICE',
  {
    factory: () => new MapCoreServiceImpl(),
  },
);
