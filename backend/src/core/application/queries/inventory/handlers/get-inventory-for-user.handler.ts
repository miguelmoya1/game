import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import {
  PLAYER_ITEM_REPOSITORY,
  PlayerItemRepository,
} from '../../../../infrastructure/repositories/player/contracts/player-item.repository.contract';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { GetInventoryForUserQuery } from '../impl/get-inventory-for-user.query';

@QueryHandler(GetInventoryForUserQuery)
export class GetInventoryForUserHandler
  implements IQueryHandler<GetInventoryForUserQuery>
{
  constructor(
    @Inject(PLAYER_ITEM_REPOSITORY)
    private readonly _playerItemRepository: PlayerItemRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async execute(query: GetInventoryForUserQuery) {
    const { user } = query;

    const player = await this._playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(
        ErrorCodes.INVENTORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (!user.checkOwnership(player.userId)) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.NOT_FOUND);
    }

    const inventory = await this._playerItemRepository.getForPlayer(player.id);

    if (!inventory) {
      throw new HttpException(
        ErrorCodes.INVENTORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return inventory.map((inventoryItem) => {
      return InventoryResponseDto.create(inventoryItem);
    });
  }
}
