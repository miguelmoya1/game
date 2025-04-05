import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../application/services/database/database.service.contract';
import { PlaceApiHistoryRepository } from '../contracts/place-api-history.repository.contract';

@Injectable()
export class PlaceApiHistoryRepositoryImpl
  implements PlaceApiHistoryRepository
{
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
  ) {}

  // TODO: Check the logic of this repository (lat, lng, radius)
  async shouldRequestApi(latitude: number, longitude: number, radius = 500) {
    const result = await this.databaseService.placeApiHistory.findFirst({
      where: {
        lat: {
          gte: latitude - 0.01,
          lte: latitude + 0.01,
        },
        lng: {
          gte: longitude - 0.01,
          lte: longitude + 0.01,
        },
        radius: {
          gte: radius - 0.01,
          lte: radius + 0.01,
        },
      },
    });

    if (!result) {
      return true;
    }
    const now = new Date();
    const diff = Math.abs(now.getTime() - result.lastRequestAt.getTime());

    const diffInMinutes = Math.floor(diff / (1000 * 60));

    if (diffInMinutes > 30) {
      return true;
    }
    return false;
  }

  // TODO: Check the logic of this repository (lat, lng, radius)
  async create(latitude: number, longitude: number, radius = 500) {
    await this.databaseService.placeApiHistory.deleteMany({
      where: {
        lat: {
          gte: latitude - 0.01,
          lte: latitude + 0.01,
        },
        lng: {
          gte: longitude - 0.01,
          lte: longitude + 0.01,
        },
        radius: {
          gte: radius - 0.01,
          lte: radius + 0.01,
        },
      },
    });

    const result = await this.databaseService.placeApiHistory.create({
      data: {
        lat: latitude,
        lng: longitude,
        radius,
        lastRequestAt: new Date(),
      },
    });

    if (!result) {
      return false;
    }

    return true;
  }
}
