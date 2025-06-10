import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetInventoryForUserQuery } from '../../core/application/queries';
import { GetInventoryQuery } from '../../core/application/queries/inventory/impl/get-inventory.query';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('inventories')
export class InventoryController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get('me')
  getInventoryUser(@AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetInventoryForUserQuery(user));
  }

  @Get('player/:playerId')
  getInventory(@AuthenticatedUser() user: UserEntity, @Param('playerId') playerId: string) {
    return this._queryBus.execute(new GetInventoryQuery(playerId, user));
  }
}
