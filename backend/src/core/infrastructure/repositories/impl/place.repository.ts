import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import { CreatePlaceDto } from '../../dto';
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
    const result = await this.databaseService.place.findMany({
      where: {
        lat: {
          gte: latitude - 0.01,
          lte: latitude + 0.01,
        },
        lng: {
          gte: longitude - 0.01,
          lte: longitude + 0.01,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 10,
    });

    if (!result) {
      return [];
    }

    return result.map(placeToEntity);
  }

  async createMany(places: CreatePlaceDto[]) {
    const result = await this.databaseService.place.createMany({
      data: places,
    });

    if (!result) {
      return false;
    }

    return true;
  }
}
