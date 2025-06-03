import { computed, inject, Injectable } from '@angular/core';
import { Marker } from 'maplibre-gl';
import { MAP_CORE_SERVICE } from './map-core.service.contract';
import { MapPlayerService, Position } from './map-player.service.contract';

@Injectable()
export class MapPlayerServiceImpl implements MapPlayerService {
  readonly #mapCoreService = inject(MAP_CORE_SERVICE);
  readonly #map = this.#mapCoreService.map;
  readonly #playerMarker = computed(() => {
    const mapLibre = this.#map();

    if (!mapLibre) {
      return null;
    }

    return new Marker({
      element: this.#createElementMarker(),
      anchor: 'center',
    });
  });

  public setPosition(position: Position) {
    const map = this.#map();
    const playerMarker = this.#playerMarker();

    if (!map || !playerMarker) {
      return;
    }

    const { latitude, longitude } = position;

    const lngLat = [longitude, latitude] as [number, number];

    playerMarker.setLngLat(lngLat).addTo(map);
  }

  #createElementMarker(): HTMLElement {
    const element = document.createElement('div');
    // Basic styles applied directly
    element.style.width = '44px';
    element.style.height = '44px';
    // SVG defines its own appearance including animation
    const svgString = `
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="15" stroke="#03A9F4" stroke-opacity="0.6" stroke-width="2"><animate attributeName="r" from="15" to="20" dur="1.5s" begin="0s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" from="0.6" to="0" dur="1.5s" begin="0s" repeatCount="indefinite"/></circle>
        <circle cx="22" cy="22" r="10" stroke="#03A9F4" stroke-opacity="0.4" stroke-width="1"><animate attributeName="r" from="10" to="18" dur="1.5s" begin="0.5s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" from="0.4" to="0" dur="1.5s" begin="0.5s" repeatCount="indefinite"/></circle>
        <circle cx="22" cy="22" r="8" fill="#03A9F4"/>
        <circle cx="22" cy="22" r="3" fill="white"/>
      </svg>
    `;
    element.innerHTML = svgString;
    // No click listener needed usually for player marker
    return element;
  }
}
