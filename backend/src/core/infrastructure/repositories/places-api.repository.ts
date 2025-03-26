import { inject } from '../../../di/di-manager.ts';
import { FASTIFY } from '../../../di/fastify.provider.ts';
import { PlaceAmenity } from '../../domain/entities/place.entity.ts';
import type { PlacesApiRepository } from '../../domain/interfaces/places-api.repository.ts';

export class PlacesApiRepositoryImpl implements PlacesApiRepository {
  readonly #overpassUrl = 'https://overpass-api.de/api/interpreter';
  readonly #logger = inject(FASTIFY).log;

  async getPlaces(latitude: number, longitude: number, radius = 1_500) {
    const deltaLat = radius / 111_000;
    const deltaLon = radius / (111_000 * Math.cos((latitude * Math.PI) / 180));

    const bBox = [latitude - deltaLat, longitude - deltaLon, latitude + deltaLat, longitude + deltaLon];

    const amenity = Object.values(PlaceAmenity).join('|');

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

      const data = await response.json();

      const poIs = [];
      for (const element of data.elements) {
        if ((element.type === 'node' || element.type === 'way') && element.tags?.amenity === amenity) {
          let name = element.tags?.name || element.tags?.['name:en'] || 'NO_NAME';
          let lat: number, lng: number;
          let addressName: string | null =
            element.tags?.['addr:street'] ||
            element.tags?.['addr:housename'] ||
            element.tags?.['addr:housenumber'] ||
            null;
          let apiId = element.id;

          if (element.type === 'node') {
            lat = element.lat;
            lng = element.lon;
          } else {
            const centroid = await this.#calculateCentroid(element.geometry);

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
            amenity,
          };

          // TODO: Add more properties to the POI object and set types
          poIs.push(poi as never);
        }
      }
      return poIs;
    } catch (error) {
      this.#logger.error(error);
      return [];
    }
  }

  async #calculateCentroid(nodes: { lat: number; lon: number }[]) {
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

// TODO: Idea, poner el get places de todos los tipos (a lo mejor mirar de poner una funcion con todo)
// guardar el area en el history de 100 en vez de la busqueda para que sea menos lioso.
// actualizar los places.
