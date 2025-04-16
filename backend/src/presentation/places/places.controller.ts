import { Controller, Get, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPlacesQuery } from '../../core/application/queries';
import { IsPublic } from '../../core/infrastructure/decorators';

@Controller('places')
export class PlacesController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  @IsPublic()
  public getPlaces(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    // @AuthenticatedUser() user: User,
  ) {
    return this._queryBus.execute(new GetPlacesQuery(lat, lng, {} as any));
    // return this._queryBus.execute(new GetPlacesQuery(lat, lng, user));
  }
}
