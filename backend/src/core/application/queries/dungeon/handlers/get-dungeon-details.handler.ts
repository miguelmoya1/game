import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  DungeonRepository,
  DungeonRepositoryImpl,
} from '../../../../infrastructure/repositories';
import { DungeonResponseDto } from '../dto/dungeon-response.dto';
import { GetDungeonDetailsQuery } from '../impl/get-dungeon-details.query';

@QueryHandler(GetDungeonDetailsQuery)
export class GetDungeonDetailsHandler
  implements IQueryHandler<GetDungeonDetailsQuery>
{
  constructor(
    @Inject(DungeonRepositoryImpl)
    private readonly dungeonRepository: DungeonRepository,
  ) {}

  async execute(query: GetDungeonDetailsQuery) {
    const { placeId } = query;

    const dungeon = await this.dungeonRepository.findByPlaceIds([placeId]);

    if (!dungeon) {
      return undefined;
    }

    return DungeonResponseDto.create(dungeon[0]);
  }
}
