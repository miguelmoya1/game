import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { PlayerResponseDto } from '../dto/player-response.dto';
import { GetPlayerByUserIdQuery } from '../impl/get-player-by-user-id.query';

@QueryHandler(GetPlayerByUserIdQuery)
export class GetPlayerByUserIdHandler
  implements IQueryHandler<GetPlayerByUserIdQuery>
{
  constructor(
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
  ) {}

  async execute(query: GetPlayerByUserIdQuery) {
    const { userId, user } = query;

    if (userId !== user.id || !user.isAdmin()) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const player = await this._playerRepository.getByUserId(userId);

    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    return PlayerResponseDto.create(player);
  }
}
