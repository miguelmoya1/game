import { AuthenticatedUser } from '@game/decorators';
import { User } from '@game/entities';
import { GetUserByIdQuery } from '@game/queries';
import { Controller, Get, Param } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get('me')
  getUserLogged(@AuthenticatedUser() user: User) {
    return this._queryBus.execute(new GetUserByIdQuery(user.id));
  }

  @Get(':userId')
  getUser(@Param('userId') userId: string) {
    return this._queryBus.execute(new GetUserByIdQuery(userId));
  }
}
