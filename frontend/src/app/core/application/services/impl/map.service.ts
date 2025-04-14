import { Injectable, signal } from '@angular/core';
import { Map } from 'maplibre-gl';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  #mapLibre = signal<Map | null>(null);

  public prepareMap(container: HTMLElement, position: [number, number] = [-74.5, 40]) {
    console.log('Preparing map...', container);
    const mapLibre = new Map({
      container,
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: position,
      zoom: 19,
      minZoom: 18,
      maxZoom: 21,
      keyboard: false,
      doubleClickZoom: false,

      pitch: 45,
      bearing: 0,
      dragPan: false,
      dragRotate: true,
    });

    this.#mapLibre.set(mapLibre);
  }

  public setCenter(center: [number, number]) {
    const mapLibre = this.#mapLibre();

    if (!mapLibre) {
      console.error('Map is not initialized yet!');
      return;
    }

    mapLibre.setCenter(center);
  }
}
