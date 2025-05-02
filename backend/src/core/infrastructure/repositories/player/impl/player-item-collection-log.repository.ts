import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { PlayerItemCollectionLogRepository } from '../contracts/player-item-collection-log.repository.contract';
import { playerItemCollectionLogToEntity } from '../mappers/player-item-collection-log.mapper';

@Injectable()
export class PlayerItemCollectionLogRepositoryImpl
  implements PlayerItemCollectionLogRepository
{
  constructor(
    @Inject(DATABASE_SERVICE) private readonly databaseService: DatabaseService,
  ) {}

  async getForPlaces(
    placeIds: string[],
    monthYear = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
  ) {
    const playerItemCollectionLogs =
      await this.databaseService.playerItemCollectionLog.findMany({
        where: {
          placeId: {
            in: placeIds,
          },
          collectionMonthYear: monthYear,
        },
      });

    return playerItemCollectionLogs.map(playerItemCollectionLogToEntity);
  }
  async getForPlace(
    placeId: string,
    monthYear = `${new Date().getFullYear()}-${(new Date().getMonth() + 1).toString().padStart(2, '0')}`,
  ) {
    const playerItemCollectionLogs =
      await this.databaseService.playerItemCollectionLog.findMany({
        where: {
          placeId: placeId,
          collectionMonthYear: monthYear,
        },
      });

    return playerItemCollectionLogs.map(playerItemCollectionLogToEntity);
  }
}
