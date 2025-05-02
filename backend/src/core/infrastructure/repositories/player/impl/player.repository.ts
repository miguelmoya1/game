import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { PlayerRepository } from '../contracts/player.repository.contract';
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
}
