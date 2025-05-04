import { Inject, Injectable } from '@nestjs/common';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../../application/services';
import { itemInclude } from '../../item/utils/item-includes';
import { PlayerItemRepository } from '../contracts/player-item.repository.contract';
import { playerItemToEntity } from '../mappers/player-item.mapper';
import { PlayerIncludePayload } from '../utils/player-includes';

@Injectable()
export class PlayerItemRepositoryImpl implements PlayerItemRepository {
  constructor(
    @Inject(DATABASE_SERVICE) private readonly _database: DatabaseService,
  ) {}

  async add(playerId: string, itemId: string) {
    const playerItem = await this._database.playerItem.findFirst({
      where: {
        playerId,
        itemId,
      },
    });

    let playerItemReturned: PlayerIncludePayload | null = null;

    if (!playerItem) {
      playerItemReturned = await this._database.playerItem.create({
        data: {
          playerId,
          itemId,
        },
        include: {
          item: {
            include: itemInclude,
          },
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
        include: {
          item: {
            include: itemInclude,
          },
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
      include: {
        item: {
          include: itemInclude,
        },
      },
    });

    if (!playerItem) {
      return [];
    }

    return playerItem.map(playerItemToEntity);
  }
}
