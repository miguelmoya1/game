import { Inject, Injectable, Logger } from '@nestjs/common';
import { PlaceCategory } from '@prisma/client';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { PlaceApiEntity } from '../../../../domain/entities';
import { PlaceApiRepository } from '../contracts/place-api.repository.contract';
import {
  ItemRepository,
  ITEM_REPOSITORY,
} from '../../item/contracts/item.repository.contract';

interface OverpassElement {
  type: 'node' | 'way' | 'relation';
  id: number;
  lat?: number;
  lon?: number;
  tags?: Record<string, string>;
}

@Injectable()
export class PlaceApiRepositoryImpl implements PlaceApiRepository {
  readonly #overpassUrl = 'https://overpass-api.de/api/interpreter';
  readonly #logger = new Logger(PlaceApiRepositoryImpl.name);
  readonly #osmTagToCategoryMap: Record<string, PlaceCategory[]> = {
    // KNOWLEDGE
    'amenity=university': [PlaceCategory.KNOWLEDGE],
    'amenity=school': [PlaceCategory.KNOWLEDGE],
    'amenity=library': [PlaceCategory.KNOWLEDGE],
    'amenity=college': [PlaceCategory.KNOWLEDGE],
    'shop=books': [PlaceCategory.KNOWLEDGE],

    // FAITH
    'amenity=place_of_worship': [PlaceCategory.FAITH],

    // NATURE
    'leisure=park': [PlaceCategory.NATURE, PlaceCategory.FITNESS],
    'natural=wood': [PlaceCategory.NATURE],
    'leisure=nature_reserve': [PlaceCategory.NATURE],
    'boundary=national_park': [PlaceCategory.NATURE],

    // COMMERCE
    // 'amenity=cafe': [PlaceCategory.COMMERCE],
    // 'shop=supermarket': [PlaceCategory.COMMERCE],
    // 'amenity=marketplace': [PlaceCategory.COMMERCE],
    // 'amenity=restaurant': [PlaceCategory.COMMERCE],
    // 'amenity=bar': [PlaceCategory.COMMERCE],
    // 'amenity=fast_food': [PlaceCategory.COMMERCE],
    // 'shop=convenience': [PlaceCategory.COMMERCE],

    // FITNESS
    'leisure=fitness_centre': [PlaceCategory.FITNESS],
    'leisure=sports_centre': [PlaceCategory.FITNESS],
    'leisure=track': [PlaceCategory.FITNESS],
    'leisure=pitch': [PlaceCategory.FITNESS],
    'leisure=stadium': [PlaceCategory.FITNESS],
    'sport=swimming': [PlaceCategory.FITNESS],

    // COMMUNITY
    'amenity=community_centre': [PlaceCategory.COMMUNITY],
    'amenity=townhall': [PlaceCategory.COMMUNITY],

    // CRAFT
    'shop=craft': [PlaceCategory.CRAFT],
    'amenity=workshop': [PlaceCategory.CRAFT],

    // HEALTH
    'amenity=hospital': [PlaceCategory.HEALTH],
    'amenity=pharmacy': [PlaceCategory.HEALTH],
    'amenity=clinic': [PlaceCategory.HEALTH],
    'amenity=doctors': [PlaceCategory.HEALTH],

    // ARTS
    'amenity=theatre': [PlaceCategory.ARTS],
    'tourism=museum': [
      PlaceCategory.ARTS,
      PlaceCategory.KNOWLEDGE,
      PlaceCategory.HISTORIC,
    ],
    'tourism=gallery': [PlaceCategory.ARTS],
    'amenity=cinema': [PlaceCategory.ARTS],

    // HISTORIC
    'historic=monument': [PlaceCategory.HISTORIC],
    'historic=castle': [PlaceCategory.HISTORIC],
    'historic=ruins': [PlaceCategory.HISTORIC],
  };

  constructor(
    @Inject(DATABASE_SERVICE)
    private readonly _databaseService: DatabaseService,
    @Inject(ITEM_REPOSITORY)
    private readonly _itemRepository: ItemRepository,
  ) {}

  async fetchAndStorePlacesFromOverpass(latitude: number, longitude: number) {
    const radius = 750;
    const EARTH_RADIUS_METERS = 111_000;
    const DEGREES_TO_RADIANS = Math.PI / 180;
    const bBox = [
      latitude - radius / EARTH_RADIUS_METERS,
      longitude -
        radius /
          (EARTH_RADIUS_METERS * Math.cos(latitude * DEGREES_TO_RADIANS)),
      latitude + radius / EARTH_RADIUS_METERS,
      longitude +
        radius /
          (EARTH_RADIUS_METERS * Math.cos(latitude * DEGREES_TO_RADIANS)),
    ];
    const queryConditions: string[] = [];
    const relevantTags = Object.keys(this.#osmTagToCategoryMap).reduce(
      (acc, key) => {
        const [tagKey, tagValue] = key.split('=');
        if (!acc[tagKey]) acc[tagKey] = new Set<string>();
        acc[tagKey].add(tagValue);
        return acc;
      },
      {} as Record<string, Set<string>>,
    );
    const bBoxStr = bBox.join(',');

    for (const [tagKey, tagValuesSet] of Object.entries(relevantTags)) {
      const valuesRegex = Array.from(tagValuesSet).join('|');
      queryConditions.push(
        `node["${tagKey}"~"^(${valuesRegex})$"](${bBoxStr});`,
      );
      queryConditions.push(
        `way["${tagKey}"~"^(${valuesRegex})$"](${bBoxStr});`,
      );
      queryConditions.push(
        `relation["${tagKey}"~"^(${valuesRegex})$"](${bBoxStr});`,
      );
    }

    const overpassQuery = `
          [out:json][timeout:60];
          (
            ${queryConditions.join('\n        ')}
          );
          out body center;
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
          center?: { lat: number; lon: number };
        }[];
      };

      let processedCount = 0;
      let skippedCount = 0;

      const allItems = await this._itemRepository.findAll();

      for (const element of data.elements) {
        const apiId = `${element.type}/${element.id}`;

        const name = element.tags?.name || element.tags?.['name:en'];
        if (!name) {
          skippedCount++;
          continue;
        }

        const categories = this.#getCategoriesForPlace(element);
        if (categories.length === 0) {
          skippedCount++;
          continue;
        }

        let lat: number, lng: number;

        if ('lat' in element && 'lon' in element) {
          lat = element.lat as number;
          lng = element.lon as number;
        } else if (element.center) {
          lat = element.center.lat;
          lng = element.center.lon;
        } else {
          skippedCount++;
          continue;
        }

        const itemsMatchingCategories = allItems.filter((item) =>
          item.spawnCategories?.some((category) => {
            return categories.includes(category);
          }),
        );

        if (itemsMatchingCategories.length === 0) {
          skippedCount++;
          continue;
        }

        // Select a random item from the filtered list
        const randomItemId =
          itemsMatchingCategories[
            Math.floor(Math.random() * itemsMatchingCategories.length)
          ].id;

        if (!randomItemId) {
          skippedCount++;
          continue;
        }

        const placeApi = PlaceApiEntity.create({
          apiId: apiId.toString(),
          name,
          lat,
          lng,
          osmTags: element.tags,
          categories,
          randomItemId,
        });

        try {
          await this._databaseService.place.upsert({
            where: { apiId: placeApi.apiId },
            update: {
              name: placeApi.name,
              lat: placeApi.lat,
              lng: placeApi.lng,
              osmTags: placeApi.osmTags,
              categories: placeApi.categories,
              currentItemId: placeApi.randomItemId,
            },
            create: {
              apiId: placeApi.apiId,
              name: placeApi.name,
              lat: placeApi.lat,
              lng: placeApi.lng,
              osmTags: placeApi.osmTags,
              categories: placeApi.categories,
              currentItemId: placeApi.randomItemId,
            },
          });

          processedCount++;
        } catch (error) {
          this.#logger.error(
            `Error saving place with API ID ${placeApi.apiId}: ${error}`,
          );
          skippedCount++;
        }
      }

      this.#logger.debug(
        `Processed ${processedCount} POIs, skipped ${skippedCount} POIs.`,
      );
    } catch (error) {
      this.#logger.error(error);
    }
  }

  #getCategoriesForPlace(place: OverpassElement): PlaceCategory[] {
    const associatedCategories = new Set<PlaceCategory>();

    if (!place.tags) return [];

    for (const [key, value] of Object.entries(place.tags)) {
      const tagString = `${key}=${value}`;
      const mapped = this.#osmTagToCategoryMap[tagString];
      if (mapped) {
        if (Array.isArray(mapped)) {
          mapped.forEach((cat) => associatedCategories.add(cat));
        } else {
          associatedCategories.add(mapped);
        }
      }
    }

    return Array.from(associatedCategories);
  }
}
