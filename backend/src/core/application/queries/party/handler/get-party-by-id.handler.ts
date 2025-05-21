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
import { GetPartyByIdQuery } from '../impl/get-party-by-id.query';

@QueryHandler(GetPartyByIdQuery)
export class GetPartyByIdHandler implements IQueryHandler<GetPartyByIdQuery> {
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(query: GetPartyByIdQuery) {
    const { partyId, user } = query;

    if (!user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

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

    return PartyResponseDto.create(party);
  }
}
