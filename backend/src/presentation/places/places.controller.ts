import { Controller, Get, Param, Query } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GetPlaceQuery, GetPlacesQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('places')
export class PlacesController {
  constructor(private readonly _queryBus: QueryBus) {}

  @Get()
  public getPlaces(
    @Query('lat') lat: number,
    @Query('lng') lng: number,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._queryBus.execute(new GetPlacesQuery(lat, lng, user));
  }

  @Get(':placeId')
  public getPlace(
    @Param('placeId') placeId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._queryBus.execute(new GetPlaceQuery(placeId, user));
  }
}
