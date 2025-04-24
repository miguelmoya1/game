import { Injectable, signal } from '@angular/core';
import { Map, MapOptions } from 'maplibre-gl';

type Position = { latitude: number; longitude: number };

const FIXED_ZOOM_LEVEL = 18;

@Injectable({
  providedIn: 'root',
})
export class MapCoreService {
  #mapLibre = signal<Map | null>(null);
  readonly #mapConfig: Partial<MapOptions> = {
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    zoom: FIXED_ZOOM_LEVEL,
    minZoom: FIXED_ZOOM_LEVEL,
    maxZoom: FIXED_ZOOM_LEVEL,
    pitch: 0,
    bearing: 0,
    keyboard: false,
    doubleClickZoom: false,
    scrollZoom: false,
    dragPan: false,
    dragRotate: true,
    touchZoomRotate: false,
  };

  public readonly map = this.#mapLibre.asReadonly();

  public setMap(element: HTMLElement) {
    this.#mapLibre.set(
      new Map({
        container: element,
        ...this.#mapConfig,
      }),
    );
  }

  public setCenter(position: Position) {
    const map = this.#mapLibre();

    if (!map) {
      return;
    }

    const { latitude, longitude } = position;

    map.setCenter([longitude, latitude]);
  }
}
