import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  AGGREGATED_STATS_SERVICE,
  AggregatedStatsService,
} from 'src/core/application/services';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_ITEM_REPOSITORY,
  PLAYER_REPOSITORY,
  PlayerItemRepository,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { PlayerWithAggregatedStatsDto } from '../dto/player-with-aggregated-stats.dto';
import { GetPlayerByUserIdQuery } from '../impl/get-player-by-user-id.query';

@QueryHandler(GetPlayerByUserIdQuery)
export class GetPlayerByUserIdHandler
  implements IQueryHandler<GetPlayerByUserIdQuery>
{
  constructor(
    @Inject(PLAYER_REPOSITORY)
    private readonly _playerRepository: PlayerRepository,
    @Inject(PLAYER_ITEM_REPOSITORY)
    private readonly _playerItemRepository: PlayerItemRepository,
    @Inject(AGGREGATED_STATS_SERVICE)
    private readonly _aggregatedStatsService: AggregatedStatsService,
    @Inject(PARTY_REPOSITORY)
    private readonly _partyRepository: PartyRepository,
  ) {}

  async execute(query: GetPlayerByUserIdQuery) {
    const { userId, user } = query;

    if (userId !== user.id && !user.isAdmin()) {
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

    const party = await this._partyRepository.findPartyByPlayer(player.id);
    const ids = party?.memberIds || [player.id];
    const inventory = await this._playerItemRepository.getForPlayerIds(ids);
    const aggregatedStats = this._aggregatedStatsService.calculate(
      player,
      inventory,
    );

    return PlayerWithAggregatedStatsDto.create(player, aggregatedStats);
  }
}
