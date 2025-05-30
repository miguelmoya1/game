import { IQuery } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';

export class GetPartyByIdQuery implements IQuery {
  constructor(
    public readonly partyId: string,
    public readonly user: UserEntity,
  ) {}
}
