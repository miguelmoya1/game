import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';

export class RemoveMemberFromPartyCommand implements ICommand {
  constructor(
    public readonly partyId: string,
    public readonly playerId: string,
    public readonly user: UserEntity,
  ) {}
}
