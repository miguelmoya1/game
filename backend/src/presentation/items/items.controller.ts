import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetItemByIdQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('items')
export class ItemsController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get(':itemId')
  getUser(
    @Param('itemId') itemId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._queryBus.execute(new GetItemByIdQuery(itemId, user));
  }
}
