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
import { PERMISSIONS_SERVICE, PermissionsService } from '../../../services';
import { ItemResponseDto } from '../../item/dto/item-response.dto';
import { InventoryResponseDto } from '../dto/inventory-response.dto';
import { GetInventoryQuery } from '../impl/get-inventory.query';

@QueryHandler(GetInventoryQuery)
export class GetInventoryHandler implements IQueryHandler<GetInventoryQuery> {
  constructor(
    @Inject(PLAYER_ITEM_REPOSITORY)
    private readonly _playerItemRepository: PlayerItemRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
    @Inject(PERMISSIONS_SERVICE)
    private readonly _permissionsService: PermissionsService,
  ) {}

  async execute(query: GetInventoryQuery) {
    const { playerId, user } = query;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const player = await this._playerRepository.getById(playerId);

    if (!player) {
      throw new HttpException(
        ErrorCodes.INVENTORY_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const inventory = await this._playerItemRepository.getForPlayer(playerId);

    if (!inventory) {
      return [];
    }

    const permissions = this._permissionsService.getItemPermissions(user);

    return inventory.map((inventoryItem) => {
      const item = ItemResponseDto.create(inventoryItem.item, permissions);

      return InventoryResponseDto.create(inventoryItem, item);
    });
  }
}
