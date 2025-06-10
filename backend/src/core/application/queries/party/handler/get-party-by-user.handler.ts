import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { PartyResponseDto } from '../dto/party-response.dto';
import { GetPartyByUserQuery } from '../impl/get-party-by-user.query';

@QueryHandler(GetPartyByUserQuery)
export class GetPartyByUserHandler implements IQueryHandler<GetPartyByUserQuery> {
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(query: GetPartyByUserQuery) {
    const { user } = query;

    const player = await this.playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(ErrorCodes.PLAYER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const party = await this.partyRepository.findPartyByPlayer(player.id);

    if (!party) {
      return null;
    }

    const isLeader = party.leaderId === player.id;
    const isMember = party.memberIds?.includes(player.id);

    if (!isLeader && !isMember && !user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    return PartyResponseDto.create(party);
  }
}
