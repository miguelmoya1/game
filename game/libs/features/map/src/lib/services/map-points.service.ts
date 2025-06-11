import { inject, Injectable, signal } from '@angular/core';
import { PointEntity } from '@game/features/points';
import { Marker } from 'maplibre-gl';
import { MAP_CORE_SERVICE } from './map-core.service.contract';
import { MapPointsService, Selected } from './map-points.service.contract';

@Injectable()
export class MapPointsServiceImpl implements MapPointsService {
  readonly #mapCoreService = inject(MAP_CORE_SERVICE);
  readonly #map = this.#mapCoreService.map;
  readonly #markers = new Map<string, Marker>();

  public readonly markerSelected = signal<Selected | null>(null);

  public setPoints(points: PointEntity[]) {
    const pointsIds = new Set(points.map((point) => point.placeId));

    const markersToRemove: string[] = [];
    this.#markers.forEach((_, poiId) => {
      if (!pointsIds.has(poiId)) {
        markersToRemove.push(poiId);
      }
    });

    markersToRemove.forEach((poiId) => {
      this.#markers.get(poiId)?.remove();
      this.#markers.delete(poiId);
    });

    const mapLibre = this.#map();

    if (!mapLibre) {
      return;
    }

    points.forEach((point) => {
      const existingMarker = this.#markers.get(point.placeId);

      if (!existingMarker) {
        const element = this.#createElementMarker(point);
        const marker = new Marker({ element })
          .setLngLat([point.lng, point.lat])
          .addTo(mapLibre);
        this.#markers.set(point.placeId, marker);
      } else {
        existingMarker
          .getElement()
          ?.setAttribute(
            'style',
            `--marker-fill-color: ${this.#getMarkerColor(point)}`,
          );
        existingMarker.setLngLat([point.lng, point.lat]);
      }
    });
  }

  #getMarkerColor(point: PointEntity) {
    return point.placePermissions.canBeClaimed
      ? 'var(--color-primary)'
      : 'var(--color-warning)';
  }

  #createElementMarker(point: PointEntity) {
    const element = document.createElement('div');
    const initialColor = point.placePermissions.canBeClaimed
      ? 'var(--color-primary)'
      : 'var(--color-warning)';
    // Basic styles applied directly, no external CSS class needed for core function
    element.style.width = '32px';
    element.style.height = '42px';
    element.style.cursor = 'pointer';

    element.style.setProperty('--marker-fill-color', initialColor);
    // Unique ID for potential targeting inside SVG
    const uniqueIdSuffix = point.placeId.replace(/[^a-zA-Z0-9]/g, '');
    // SVG defines its own appearance including animation and color via fill attribute
    const svgString = `
      <svg width="32" height="42" viewBox="0 0 32 42" fill="none" xmlns="http://www.w3.org/2000/svg" style="overflow: visible;">
        <defs>
          <filter id="poi-diamond-shadow-${uniqueIdSuffix}" x="-50%" y="-40%" width="200%" height="200%">
            <feDropShadow dx="1" dy="3" stdDeviation="2" flood-color="#000000" flood-opacity="0.4"/>
          </filter>
        </defs>
        <g filter="url(#poi-diamond-shadow-${uniqueIdSuffix})">
          <path id="marker-body-${uniqueIdSuffix}"
            d="M16 40 C16 40 4 24 4 16 C4 8 9 2 16 2 C23 2 28 8 28 16 C28 24 16 40 16 40 Z"
            fill="var(--marker-fill-color)" stroke="#424242" stroke-width="0.5">
            <animateTransform attributeName="transform" attributeType="XML" type="rotate" from="-5 16 40" to="5 16 40" dur="20s" repeatCount="indefinite" values="-5 16 40; 0 16 40; 5 16 40; 0 16 40; -5 16 40" keyTimes="0; 0.25; 0.5; 0.75; 1" calcMode="spline" keySplines="0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1; 0.4 0 0.2 1"/>
            </path>
          </g>
        </svg>
      `;
    element.innerHTML = svgString;

    element.addEventListener('click', (e) => {
      e.stopPropagation();

      // Find the marker instance associated with this element/poiId
      const markerInstance = this.#markers.get(point.placeId);

      if (!markerInstance) {
        this.markerSelected.set(null);
        return;
      }

      const selected = {
        marker: markerInstance ?? null,
        point: this.markerSelected()?.point === point ? null : point,
      };

      this.markerSelected.set(selected);
    });

    return element;
  }
}
