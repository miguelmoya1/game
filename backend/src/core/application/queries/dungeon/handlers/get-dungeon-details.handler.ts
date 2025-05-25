import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from 'src/core/domain/enums';
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
    const dungeon = await this.dungeonRepository.findById(query.dungeonId);

    if (!dungeon) {
      throw new HttpException(
        ErrorCodes.DUNGEON_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return DungeonResponseDto.create(dungeon);
  }
}
