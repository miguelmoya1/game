import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import {
  Create,
  PlayerRepository,
} from '../contracts/player.repository.contract';
import { playerToEntity } from '../mappers/player.mapper';

@Injectable()
export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,
  ) {}

  async getById(playerId: string) {
    const player = await this._database.player.findUnique({
      where: { id: playerId },
    });

    if (!player) {
      return null;
    }

    return playerToEntity(player);
  }

  async getByUserId(userId: string) {
    const player = await this._database.player.findUnique({
      where: { userId },
    });

    if (!player) {
      return null;
    }

    return playerToEntity(player);
  }

  async create(player: Create) {
    const newPlayer = await this._database.player.create({
      data: {
        userId: player.userId,
        raceId: player.raceId,
        stats: player.stats,
      },
    });

    return playerToEntity(newPlayer);
  }
}
