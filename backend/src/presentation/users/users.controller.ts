import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/core/application/commands';
import { UpdateUserDto } from 'src/core/infrastructure/dto';
import { GetUserByIdQuery } from '../../core/application/queries';
import { User } from '../../core/domain/entities/impl/user.entity';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

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

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthenticatedUser() user: User,
  ) {
    return this._commandBus.execute(
      new UpdateUserCommand(updateUserDto, userId, user),
    );
  }
}
