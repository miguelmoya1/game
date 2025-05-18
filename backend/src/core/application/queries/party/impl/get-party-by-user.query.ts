import { IQuery } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';

export class GetPartyByUserQuery implements IQuery {
  constructor(public readonly user: UserEntity) {}
}
