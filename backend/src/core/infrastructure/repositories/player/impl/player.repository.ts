import { Inject, Injectable } from '@nestjs/common';
import { DATABASE_SERVICE, DatabaseService } from '../../../../application/services';
import { Create, PlayerRepository } from '../contracts/player.repository.contract';
import { playerToEntity } from '../mappers/player.mapper';

@Injectable()
export class PlayerRepositoryImpl implements PlayerRepository {
  constructor(@Inject(DATABASE_SERVICE) private readonly _database: DatabaseService) {}

  async getById(playerId: string) {
    const now = new Date();
    const player = await this._database.player.findFirst({
      where: {
        id: playerId,
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
    });

    if (!player) {
      return null;
    }

    return playerToEntity(player);
  }

  async getByIds(playerIds: string[]) {
    const now = new Date();
    const players = await this._database.player.findMany({
      where: {
        id: { in: playerIds },
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
    });

    return players.map(playerToEntity);
  }

  async getByUserId(userId: string) {
    const now = new Date();
    const player = await this._database.player.findFirst({
      where: {
        userId,
        OR: [{ deletedAt: null }, { deletedAt: { gt: now } }],
      },
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

  async delete(id: string) {
    await this._database.player.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }
}
