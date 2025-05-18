import { ICommand } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';

export class DeletePartyCommand implements ICommand {
  constructor(
    public readonly partyId: string,
    public readonly user: UserEntity,
  ) {}
}
