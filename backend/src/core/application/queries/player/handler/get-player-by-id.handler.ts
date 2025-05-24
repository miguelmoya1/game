import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import {
  AGGREGATED_STATS_SERVICE,
  AggregatedStatsService,
} from 'src/core/application/services';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLAYER_ITEM_REPOSITORY,
  PLAYER_REPOSITORY,
  PlayerItemRepository,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import {
  PARTY_REPOSITORY,
  PartyRepository,
} from '../../../../infrastructure/repositories/party/contracts/party.repository.contract';
import { PlayerWithAggregatedStatsDto } from '../dto/player-with-aggregated-stats.dto';
import { GetPlayerByIdQuery } from '../impl/get-player-by-id.query';

@QueryHandler(GetPlayerByIdQuery)
export class GetPlayerByIdHandler implements IQueryHandler<GetPlayerByIdQuery> {
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

  async execute(query: GetPlayerByIdQuery) {
    const { playerId, user } = query;

    const player = await this._playerRepository.getById(playerId);

    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    if (player.userId !== user.id && !user.isAdmin()) {
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
