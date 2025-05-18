import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { GetPartyMembersQuery } from '../impl/get-party-members.query';

@QueryHandler(GetPartyMembersQuery)
export class GetPartyMembersHandler
  implements IQueryHandler<GetPartyMembersQuery>
{
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(query: GetPartyMembersQuery) {
    const { partyId, user } = query;

    const party = await this.partyRepository.findById(partyId);
    if (!party) {
      throw new HttpException(ErrorCodes.PARTY_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const player = await this.playerRepository.getByUserId(user.id);
    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isLeader = party.leaderId === player.id;
    const isMember = party.memberIds?.includes(player.id);

    if (!isLeader && !isMember && !user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    const playerIds = await this.partyRepository.getPlayerIds(partyId);

    if (!playerIds) {
      throw new HttpException(
        ErrorCodes.PARTY_MEMBERS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const players = await this.playerRepository.getByIds(playerIds);

    if (!players) {
      throw new HttpException(
        ErrorCodes.PARTY_MEMBERS_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    // TODO: check this
    return players.map((player) => ({
      id: player.id,
      level: player.level,
      partyId: party.id,
    }));
  }
}
