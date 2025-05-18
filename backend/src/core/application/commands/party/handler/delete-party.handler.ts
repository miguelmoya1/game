import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ErrorCodes } from '../../../../domain/enums';
import {
  PLAYER_REPOSITORY,
  PlayerRepository,
} from '../../../../infrastructure/repositories';
import {
  PARTY_REPOSITORY,
  PartyRepository,
} from '../../../../infrastructure/repositories/party/contracts/party.repository.contract';
import { DeletePartyCommand } from '../impl/delete-party.command';

@CommandHandler(DeletePartyCommand)
export class DeletePartyHandler implements ICommandHandler<DeletePartyCommand> {
  constructor(
    @Inject(PARTY_REPOSITORY) private readonly partyRepository: PartyRepository,
    @Inject(PLAYER_REPOSITORY)
    private readonly playerRepository: PlayerRepository,
  ) {}

  async execute(command: DeletePartyCommand): Promise<void> {
    const { partyId, user } = command;

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

    if (!isLeader && !user.isAdmin()) {
      throw new HttpException(ErrorCodes.UNAUTHORIZED, HttpStatus.UNAUTHORIZED);
    }

    await this.partyRepository.delete(command.partyId);
  }
}
