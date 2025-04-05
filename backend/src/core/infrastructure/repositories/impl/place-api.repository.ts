import { Injectable, Logger } from '@nestjs/common';
import { PlaceAmenity } from '@prisma/client';
import { PlaceApi } from '../../../domain/types/place-api.types';
import { PlaceApiRepository } from '../contracts/place-api.repository.contract';

@Injectable()
export class PlaceApiRepositoryImpl implements PlaceApiRepository {
  readonly #overpassUrl = 'https://overpass-api.de/api/interpreter';
  readonly #logger = new Logger(PlaceApiRepositoryImpl.name);

  async getPlaces(latitude: number, longitude: number, radius = 1_500) {
    const deltaLat = radius / 111_000;
    const deltaLon = radius / (111_000 * Math.cos((latitude * Math.PI) / 180));

    const bBox = [
      latitude - deltaLat,
      longitude - deltaLon,
      latitude + deltaLat,
      longitude + deltaLon,
    ];

    const amenity = Object.values(PlaceAmenity).join('|').toLocaleLowerCase();

    const overpassQuery = `
      [out:json][timeout:25];
      (
        node["amenity"~"${amenity}"](${bBox.join(',')});
        way["amenity"~"${amenity}"](${bBox.join(',')});
        relation["amenity"~"${amenity}"](${bBox.join(',')});
      );
      out geom;
      >;
      out skel qt;
    `;

    try {
      const response = await fetch(this.#overpassUrl, {
        method: 'POST',
        body: `data=${encodeURIComponent(overpassQuery)}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      });

      if (!response.ok) {
        // TODO: check response status and throw a more specific error
        this.#logger.error(`Error en getPlaces: ${response.statusText}`);
        throw new Error(`Error en getPlaces: ${response.statusText}`);
      }

      // TODO: Move to a DTO
      const data = (await response.json()) as {
        elements: {
          type: 'node' | 'way' | 'relation';
          id: number;
          tags: Record<string, string>;
          lat?: number;
          lon?: number;
          geometry?: { lat: number; lon: number }[];
        }[];
      };

      const poIs: PlaceApi[] = [];
      for (const element of data.elements) {
        if (
          (element.type === 'node' || element.type === 'way') &&
          element.tags?.amenity === amenity
        ) {
          const name =
            element.tags?.name || element.tags?.['name:en'] || 'NO_NAME';
          let lat: number, lng: number;
          const addressName: string =
            element.tags?.['addr:street'] ||
            element.tags?.['addr:housename'] ||
            element.tags?.['addr:housenumber'] ||
            '';
          const apiId = element.id;

          if (element.type === 'node') {
            lat = element.lat as number;
            lng = element.lon as number;
          } else {
            const centroid = this.#calculateCentroid(element.geometry!);

            if (centroid) {
              lat = centroid.lat;
              lng = centroid.lon;
            } else {
              continue;
            }
          }

          const poi = {
            apiId,
            name,
            lat,
            lng,
            addressName,
            amenity: element.tags?.amenity as PlaceAmenity,
          };

          poIs.push(poi);
        }
      }
      return poIs;
    } catch (error) {
      this.#logger.error(error);
      return [];
    }
  }

  #calculateCentroid(nodes: { lat: number; lon: number }[]) {
    if (!nodes || nodes.length === 0) {
      return null;
    }

    let area = 0.0;
    let cx = 0.0;
    let cy = 0.0;
    const n = nodes.length;

    for (let i = 0; i < n; i++) {
      const x1 = nodes[i].lon;
      const y1 = nodes[i].lat;
      const x2 = nodes[(i + 1) % n].lon;
      const y2 = nodes[(i + 1) % n].lat;
      const cross = x1 * y2 - x2 * y1;
      area += cross;
      cx += (x1 + x2) * cross;
      cy += (y1 + y2) * cross;
    }

    area *= 0.5;
    if (area === 0) {
      return { lon: nodes[0].lon, lat: nodes[0].lat };
    }
    cx /= 6 * area;
    cy /= 6 * area;
    return { lon: cx, lat: cy };
  }
}
