import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import { placeToEntity } from '../../mappers';
import { PlaceRepository } from '../contracts/place.repository.contract';

@Injectable()
export class PlaceRepositoryImpl implements PlaceRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
  ) {}

  async findById(id: string) {
    const result = await this.databaseService.place.findUnique({
      where: {
        id,
      },
    });

    if (!result) {
      return null;
    }

    return placeToEntity(result);
  }

  // TODO: Check the logic of this repository (lat, lng, radius)
  async get(latitude: number, longitude: number) {
    const radius = 500; // 500m

    const EARTH_RADIUS_METERS = 6_371_000;
    const DEGREES_TO_RADIANS = Math.PI / 180;

    const latitudeDelta = (radius / EARTH_RADIUS_METERS) * (180 / Math.PI);
    const longitudeDelta =
      (radius /
        (EARTH_RADIUS_METERS * Math.cos(latitude * DEGREES_TO_RADIANS))) *
      (180 / Math.PI);

    const result = await this.databaseService.place.findMany({
      where: {
        lat: {
          gte: latitude - latitudeDelta,
          lte: latitude + latitudeDelta,
        },
        lng: {
          gte: longitude - longitudeDelta,
          lte: longitude + longitudeDelta,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!result) {
      return [];
    }

    return result.map(placeToEntity);
  }
}
