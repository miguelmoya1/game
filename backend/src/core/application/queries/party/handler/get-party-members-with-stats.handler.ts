import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AggregatedStatsServiceImpl } from '../../../../application/services';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_ITEM_REPOSITORY,
  PLAYER_REPOSITORY,
  PlayerItemRepository,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { PlayerResponseWithStatsDto } from '../dto/player-response-with-stats.dto';
import { GetPartyMembersWithStatsQuery } from '../impl/get-party-members-with-stats.query';

@QueryHandler(GetPartyMembersWithStatsQuery)
@Injectable()
export class GetPartyMembersWithStatsHandler
  implements IQueryHandler<GetPartyMembersWithStatsQuery>
{
  constructor(
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
    @Inject(PLAYER_ITEM_REPOSITORY)
    private readonly playerItemRepository: PlayerItemRepository,
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    private readonly aggregatedStatsService: AggregatedStatsServiceImpl,
  ) {}

  async execute(query: GetPartyMembersWithStatsQuery) {
    const { user } = query;
    const player = await this.playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const party = await this.partyRepository.findPartyByPlayer(player.id);

    if (!party) {
      throw new HttpException(ErrorCodes.PARTY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const members = await this.playerRepository.getByIds(party.memberIds ?? []);

    if (!members || members.length === 0) {
      return [];
    }

    const partyInventories = await this.playerItemRepository.getForPlayerIds(
      party.memberIds ?? [],
    );

    return members.map((member) => {
      const aggregatedStats = this.aggregatedStatsService.calculate(
        member,
        partyInventories,
      );

      return PlayerResponseWithStatsDto.create(member, aggregatedStats);
    });
  }
}
