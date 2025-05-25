import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { UserEntity } from 'src/core/domain/entities';
import {
  GetDungeonDetailsQuery,
  GetNearbyDungeonsQuery,
} from '../../core/application/queries';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('dungeons')
export class DungeonController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get('nearby')
  async getNearby(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @Query('radius') radius: number,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const query = new GetNearbyDungeonsQuery(lat, lng, radius, user);

    return this.queryBus.execute<GetNearbyDungeonsQuery, unknown>(query);
  }

  @Get(':dungeonId')
  async getDetails(
    @Param('dungeonId') dungeonId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    const query = new GetDungeonDetailsQuery(dungeonId, user);

    return this.queryBus.execute<GetDungeonDetailsQuery, unknown>(query);
  }
}
