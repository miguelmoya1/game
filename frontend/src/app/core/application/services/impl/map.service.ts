import { computed, effect, Injectable, signal } from '@angular/core';
import { Map as MapLibre, MapOptions, Marker } from 'maplibre-gl';

interface PoiData {
  id: string;

  name: string;

  lat: number;
  lng: number;
}

export type Position = [number, number];

@Injectable({
  providedIn: 'root',
})
export class MapService {
  // MAP START
  readonly #mapLibre = signal<MapLibre | null>(null);
  readonly #mapConfig: Partial<MapOptions> = {
    style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
    zoom: 18,
    keyboard: false,
    doubleClickZoom: false,
    scrollZoom: false,

    dragPan: false,
    dragRotate: true,
  };
  // MAP END

  public readonly markerSelected = signal<Marker | null>(null);

  // PLAYER START
  public readonly playerPosition = signal<Position | null>(null);
  readonly #userMarker = computed(() => {
    const mapLibre = this.#mapLibre();

    if (!mapLibre) {
      return null;
    }

    return new Marker({
      element: this.#createElementForUserMarker(),
      anchor: 'center',
    });
  });
  // PLAYER END

  // MARKER START
  public readonly poisToDisplay = signal<PoiData[]>([]);
  readonly #markers = new Map<string, Marker>();
  // MARKER END

  constructor() {
    effect(() => {
      const mapLibre = this.#mapLibre();
      const playerPosition = this.playerPosition();

      if (!mapLibre) {
        return;
      }

      if (!playerPosition) {
        return;
      }

      this.#userMarker()?.remove();

      this.#userMarker()?.setLngLat(playerPosition).addTo(mapLibre);

      mapLibre.setCenter(playerPosition);
    });

    effect(() => {
      const mapLibre = this.#mapLibre();

      if (!mapLibre) {
        this.#markers.forEach((marker) => marker.remove());
        this.#markers.clear();
        return;
      }

      const pois = this.poisToDisplay();

      this.#markers.forEach((marker, poId) => {
        if (!pois.find((poi) => poi.id === poId)) {
          marker.remove();
          this.#markers.delete(poId);
        }
      });

      pois.forEach((poi) => {
        if (!this.#markers.has(poi.id)) {
          const element = this.#createElementForMarker(poi);

          const marker = new Marker({
            element,
            anchor: 'center',
          })
            .setLngLat([poi.lng, poi.lat])
            .addTo(mapLibre);

          this.#markers.set(poi.id, marker);
        }
      });
    });
  }

  public prepareMap(container: HTMLElement) {
    const mapLibre = new MapLibre({
      container,
      ...this.#mapConfig,
    });

    this.#mapLibre.set(mapLibre);
  }

  public setCenter(center: [number, number]) {
    this.#mapLibre()?.setCenter(center);
  }

  #createElementForMarker(poi: PoiData) {
    const element = document.createElement('div');

    element.className = 'marker';
    const svgString = `
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="poi-diamond-shadow" x="-50%" y="-40%" width="200%" height="200%">
            <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#000000" flood-opacity="0.4"/>
          </filter>
        </defs>

        <g filter="url(#poi-diamond-shadow)">
          <path id="marker-body"
                d="M16 40 C16 40 4 24 4 16 C4 8 9 2 16 2 C23 2 28 8 28 16 C28 24 16 40 16 40 Z"
                fill="#FFC107" stroke="#424242" stroke-width="0.5" >
            <animateTransform
                  attributeName="transform"
                  attributeType="XML"
                  type="rotate"
                  from="-5 16 40" to="5 16 40"   dur="25s"
                  repeatCount="indefinite"
                  values="-5 16 40; 0 16 40; 5 16 40; 0 16 40; -5 16 40" keyTimes="0; 0.25; 0.5; 0.75; 1"
                  calcMode="spline"
                  keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"
                  />
          </path>
          </g>
      </svg>
    `;

    element.innerHTML = svgString;

    element.onclick = () => {
      this.markerSelected.set(this.#markers.get(poi.id) ?? null);
      console.log(`Clicked on marker: ${poi.name}`, poi);
    };

    return element;
  }

  #createElementForUserMarker() {
    const element = document.createElement('div');

    const svgString = `
      <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="22" cy="22" r="15" stroke="#03A9F4" stroke-opacity="0.6" stroke-width="2">
          <animate
            attributeName="r"
            from="15"
            to="20"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"/>
          <animate
            attributeName="stroke-opacity"
            from="0.6"
            to="0"
            dur="1.5s"
            begin="0s"
            repeatCount="indefinite"/>
        </circle>
        <circle cx="22" cy="22" r="10" stroke="#03A9F4" stroke-opacity="0.4" stroke-width="1">
          <animate
            attributeName="r"
            from="10"
            to="18"
            dur="1.5s"
            begin="0.5s"
            repeatCount="indefinite"/>
          <animate
            attributeName="stroke-opacity"
            from="0.4"
            to="0"
            dur="1.5s"
            begin="0.5s"
            repeatCount="indefinite"/>
        </circle>
        <circle cx="22" cy="22" r="8" fill="#03A9F4"/>
        <circle cx="22" cy="22" r="3" fill="white"/>
      </svg>
    `;

    element.innerHTML = svgString;

    return element;
  }
}
