import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntity } from 'src/core/domain/entities';
import { GetDungeonDetailsQuery } from '../../core/application/queries';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('dungeons')
export class DungeonController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get(':placeId')
  async getDetails(@Param('placeId') placeId: string, @AuthenticatedUser() user: UserEntity) {
    const query = new GetDungeonDetailsQuery(placeId, user);

    return this.queryBus.execute<GetDungeonDetailsQuery, unknown>(query);
  }
}
