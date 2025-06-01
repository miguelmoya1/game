import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { AggregatedStatsServiceImpl } from '../../../../application/services';
import { ErrorCodes } from '../../../../domain/enums';
import {
  ITEM_REPOSITORY,
  ItemRepository,
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_ITEM_REPOSITORY,
  PLAYER_REPOSITORY,
  PlayerItemRepository,
  PlayerRepository,
  SET_REPOSITORY,
  SetRepository,
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
    @Inject(ITEM_REPOSITORY) private readonly itemRepository: ItemRepository,
    @Inject(SET_REPOSITORY) private readonly setRepository: SetRepository,
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

    const players: PlayerResponseWithStatsDto[] = [];

    const items = await this.itemRepository.getAll();
    const sets = await this.setRepository.getAll();

    for (const member of members) {
      const aggregatedStats = this.aggregatedStatsService.calculate(
        member,
        partyInventories,
        items,
        sets,
      );

      players.push(PlayerResponseWithStatsDto.create(member, aggregatedStats));
    }

    return players;
  }
}
