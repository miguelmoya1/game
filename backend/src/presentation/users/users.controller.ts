import { Controller, Get } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetUserByIdQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities/impl/user.entity';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get('me')
  getUserLogged(@AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetUserByIdQuery(user.id));
  }
}
