import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  DungeonRepository,
  DungeonRepositoryImpl,
} from '../../../../infrastructure/repositories';
import { DungeonResponseDto } from '../dto/dungeon-response.dto';
import { GetNearbyDungeonsQuery } from '../impl/get-nearby-dungeons.query';

@QueryHandler(GetNearbyDungeonsQuery)
export class GetNearbyDungeonsHandler
  implements IQueryHandler<GetNearbyDungeonsQuery>
{
  constructor(
    @Inject(DungeonRepositoryImpl)
    private readonly dungeonRepository: DungeonRepository,
  ) {}

  async execute(query: GetNearbyDungeonsQuery) {
    const { lat, lng, radiusKm } = query;

    const dungeons = await this.dungeonRepository.findNearby(
      lat,
      lng,
      radiusKm,
    );

    return dungeons.map((dungeon) => DungeonResponseDto.create(dungeon));
  }
}
