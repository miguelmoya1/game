import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { ClaimPlaceItemCommand } from '../../core/application/commands';
import { GetPlaceQuery, GetPlacesQuery } from '../../core/application/queries';
import { UserEntity } from '../../core/domain/entities';
import { AuthenticatedUser } from '../../core/infrastructure/decorators';

@Controller('places')
export class PlacesController {
  constructor(
    private readonly _queryBus: QueryBus,
    private readonly _commandBus: CommandBus,
  ) {}

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

  @Post(':placeId/claim')
  public claimPlace(
    @Param('placeId') placeId: string,
    @AuthenticatedUser() user: UserEntity,
  ) {
    return this._commandBus.execute(new ClaimPlaceItemCommand(placeId, user));
  }
}
