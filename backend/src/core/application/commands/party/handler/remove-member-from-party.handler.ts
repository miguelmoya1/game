import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PARTY_REPOSITORY,
  PartyRepository,
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import { RemoveMemberFromPartyCommand } from '../impl/remove-member-from-party.command';

@CommandHandler(RemoveMemberFromPartyCommand)
export class RemoveMemberFromPartyHandler implements ICommandHandler<RemoveMemberFromPartyCommand> {
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(command: RemoveMemberFromPartyCommand): Promise<void> {
    const { user, partyId, playerId } = command;

    const party = await this.partyRepository.findById(partyId);

    if (!party) {
      throw new HttpException(ErrorCodes.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    const player = await this.playerRepository.getByUserId(user.id);

    if (!player) {
      throw new HttpException(ErrorCodes.PLAYER_NOT_FOUND, HttpStatus.NOT_FOUND);
    }

    const isLeader = party.leaderId === player.id;
    const isSelf = player.id === playerId;

    if (!isLeader && !user.isAdmin() && !isSelf) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    await this.partyRepository.removeMember(partyId, playerId);
  }
}
