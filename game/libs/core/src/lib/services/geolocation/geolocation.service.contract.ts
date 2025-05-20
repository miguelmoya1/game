import { InjectionToken, Signal } from '@angular/core';
import { Position } from '@capacitor/geolocation';
import { GeolocationServiceImpl } from './geolocation.service';

export interface GeolocationService {
  readonly position: Signal<Position | null>;
  readonly watching: Signal<boolean>;
  updateCurrentPosition(): Promise<void>;
  setWatching(watching: boolean): void;
}

export const GEOLOCATION_SERVICE = new InjectionToken<GeolocationService>(
  'GeolocationService',
  {
    providedIn: 'root',
    factory: () => new GeolocationServiceImpl(),
  }
);
