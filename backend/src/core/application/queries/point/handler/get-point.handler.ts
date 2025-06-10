import { IQueryHandler, QueryBus, QueryHandler } from '@nestjs/cqrs';
import { DungeonEntity, PlaceEntity } from 'src/core/domain/entities';
import { ErrorCodes } from '../../../../domain/enums';
import { GetDungeonDetailsQuery } from '../../dungeon/impl/get-dungeon-details.query';
import { GetPlaceQuery } from '../../place/impl/get-place.query';
import { PointResponseDto } from '../dto/point-response.dto';
import { GetPointQuery } from '../impl/get-point.query';

@QueryHandler(GetPointQuery)
export class GetPointHandler implements IQueryHandler<GetPointQuery> {
  constructor(private readonly queryBus: QueryBus) {}

  async execute(query: GetPointQuery) {
    const { placeId, user } = query;

    if (!placeId) {
      throw new Error(ErrorCodes.PLACE_NOT_FOUND);
    }

    const place = await this.queryBus.execute<GetPlaceQuery, PlaceEntity>(
      new GetPlaceQuery(placeId, user),
    );

    const dungeon = await this.queryBus.execute<
      GetDungeonDetailsQuery,
      DungeonEntity
    >(new GetDungeonDetailsQuery(placeId, user));

    return PointResponseDto.create({
      place,
      dungeon,
    });
  }
}
