import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPointsQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('points')
export class PointsController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  public getPoints(@Query('lat') lat: number, @Query('lng') lng: number, @AuthenticatedUser() user: UserEntity) {
    return this._queryBus.execute(new GetPointsQuery(lat, lng, user));
  }
}
