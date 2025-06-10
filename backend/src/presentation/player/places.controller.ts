import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPlayerByIdQuery, GetPlayerByUserIdQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('players')
export class PlayerController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('me')
  public getPlayer(@AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetPlayerByUserIdQuery(user.id, user));
  }

  @Get(':playerId')
  public getPlace(@Param('playerId') playerId: string, @AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetPlayerByIdQuery(playerId, user));
  }
}
