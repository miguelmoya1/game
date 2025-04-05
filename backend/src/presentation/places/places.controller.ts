import { Controller, Get, Param } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPlacesQuery } from '../../core/application/queries';
import { User } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('places')
export class PlacesController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  public getPlaces(
    @Param('lat') lat: number,
    @Param('lng') lng: number,
    @AuthenticatedUser() user: User,
  ) {
    return this._queryBus.execute(new GetPlacesQuery(lat, lng, user));
  }
}
