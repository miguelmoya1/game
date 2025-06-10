import { Inject, Injectable } from '@nestjs/common';
import { PlayerItem, PlayerItemEntity } from '../../../../domain/entities';
import { DATABASE_SERVICE, DatabaseService } from '../../../../application/services';
import { PlayerItemRepository } from '../contracts/player-item.repository.contract';
import { playerItemToEntity } from '../mappers/player-item.mapper';

@Injectable()
export class PlayerItemRepositoryImpl implements PlayerItemRepository {
  constructor(@Inject(DATABASE_SERVICE) private readonly _database: DatabaseService) {}

  async getForPlayerIds(playerIds: string[]): Promise<PlayerItemEntity[]> {
    const playerItems = await this._database.playerItem.findMany({
      where: {
        playerId: {
          in: playerIds,
        },
      },
    });

    if (!playerItems) {
      return [];
    }

    return playerItems.map(playerItemToEntity);
  }

  async add(playerId: string, itemId: string) {
    const playerItem = await this._database.playerItem.findFirst({
      where: {
        playerId,
        itemId,
      },
    });

    let playerItemReturned: PlayerItem | null = null;

    if (!playerItem) {
      playerItemReturned = await this._database.playerItem.create({
        data: {
          playerId,
          itemId,
        },
      });
    } else {
      playerItemReturned = await this._database.playerItem.update({
        where: {
          id: playerItem.id,
        },
        data: {
          quantity: playerItem.quantity + 1,
        },
      });
    }

    return playerItemToEntity(playerItemReturned);
  }

  async getForPlayer(playerId: string) {
    const playerItem = await this._database.playerItem.findMany({
      where: {
        playerId,
      },
    });

    if (!playerItem) {
      return [];
    }

    return playerItem.map(playerItemToEntity);
  }
}
