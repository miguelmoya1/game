import { Inject, Injectable } from '@nestjs/common';
import { PlaceEntity } from 'src/core/domain/entities';
import { DATABASE_SERVICE, DatabaseService } from '../../../../application/services';
import { PlaceRepository } from '../contracts/place.repository.contract';
import { placeListToEntity } from '../mappers/place-list.mapper';
import { placeToEntity } from '../mappers/place.mapper';

@Injectable()
export class PlaceRepositoryImpl implements PlaceRepository {
  constructor(@Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService) {}

  async findById(id: string) {
    const now = new Date();
    const result = await this.databaseService.place.findFirst({
      where: {
        id,
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
    });

    if (!result) {
      return null;
    }

    return placeToEntity(result);
  }

  async search(criteria: string) {
    const now = new Date();
    const result = await this.databaseService.place.findMany({
      where: {
        AND: [
          { OR: [{ deletedAt: null }, { deletedAt: { gt: now } }] },
          {
            OR: [
              {
                id: {
                  contains: criteria,
                  mode: 'insensitive',
                },
              },
              {
                name: {
                  contains: criteria,
                  mode: 'insensitive',
                },
              },
            ],
          },
        ],
      },
      take: 5,
    });

    return result.map((place) => placeToEntity(place));
  }

  // TODO: Check the logic of this repository (lat, lng, radius)
  async get(latitude: number, longitude: number) {
    const now = new Date();
    const radius = 500; // 500m

    const EARTH_RADIUS_METERS = 6_371_000;
    const DEGREES_TO_RADIANS = Math.PI / 180;

    const latitudeDelta = (radius / EARTH_RADIUS_METERS) * (180 / Math.PI);
    const longitudeDelta = (radius / (EARTH_RADIUS_METERS * Math.cos(latitude * DEGREES_TO_RADIANS))) * (180 / Math.PI);

    const result = await this.databaseService.place.findMany({
      where: {
        AND: [
          { OR: [{ deletedAt: null }, { deletedAt: { gt: now } }] },
          {
            lat: {
              gte: latitude - latitudeDelta,
              lte: latitude + latitudeDelta,
            },
            lng: {
              gte: longitude - longitudeDelta,
              lte: longitude + longitudeDelta,
            },
          },
        ],
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) {
      return [];
    }

    return result.map(placeListToEntity);
  }

  async delete(id: string) {
    await this.databaseService.place.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async getAll(offset: number, limit: number) {
    const now = new Date();
    const result = await this.databaseService.place.findMany({
      where: {
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
      select: {
        id: true,
        categories: true,
      },
      skip: offset,
      take: limit,
    });

    return result;
  }

  async updateMany(data: Pick<PlaceEntity, 'id' | 'currentItemId'>[]) {
    if (!data.length) {
      return;
    }

    await this.databaseService.place.updateMany({
      data,
    });
  }

  async getCount() {
    const now = new Date();
    return this.databaseService.place.count({
      where: {
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
    });
  }

  async getRandom(count: number, excludedIds: string[]) {
    const now = new Date();
    const result = await this.databaseService.place.findMany({
      where: {
        AND: [{ OR: [{ deletedAt: null }, { deletedAt: { gt: now } }] }, { id: { notIn: excludedIds } }],
      },
      select: { id: true, lat: true, lng: true, categories: true },
      take: count,
      orderBy: { createdAt: 'desc' },
    });

    return result;
  }
}
