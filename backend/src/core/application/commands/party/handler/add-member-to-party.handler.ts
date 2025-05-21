import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes, PartyStatus } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { AddMemberToPartyCommand } from '../impl/add-member-to-party.command';

@CommandHandler(AddMemberToPartyCommand)
export class AddMemberToPartyHandler
  implements ICommandHandler<AddMemberToPartyCommand>
{
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(command: AddMemberToPartyCommand): Promise<void> {
    const { user, playerId } = command;
    let { partyId } = command;

    if (!user) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (!partyId) {
      const userPlayerId = await this.playerRepository.getByUserId(user.id);

      if (!userPlayerId) {
        throw new HttpException(
          ErrorCodes.PLAYER_NOT_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }

      let party = await this.partyRepository.findPartyByPlayer(userPlayerId.id);

      if (!party) {
        party = await this.partyRepository.create({
          leaderId: userPlayerId.id,
          description: '',
          status: PartyStatus.OPEN,
        });
      }

      partyId = party.id;
    }

    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new HttpException(
        ErrorCodes.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    const player = await this.playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(
        ErrorCodes.PLAYER_NOT_FOUND,
        HttpStatus.NOT_FOUND,
      );
    }

    const isLeader = party.leaderId === player.id;
    const isMember = party.memberIds?.includes(playerId);

    if (!isLeader && !user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    if (isMember) {
      throw new HttpException(
        ErrorCodes.PLAYER_ALREADY_IN_PARTY,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.partyRepository.addMember(partyId, playerId);
  }
}
