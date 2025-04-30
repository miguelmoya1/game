import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UpdateUserCommand } from 'src/core/application/commands';
import { GetUserByIdQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities/impl/user.entity';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

  @Get('me')
  getUserLogged(@AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetUserByIdQuery(user.id));
  }

  @Patch(':userId')
  updateUser(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._commandBus.execute(
      new UpdateUserCommand(updateUserDto, userId, user),
    );
  }
}
