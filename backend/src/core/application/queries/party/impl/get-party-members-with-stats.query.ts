import { IQuery } from '@nestjs/cqrs';
import { UserEntity } from '../../../../domain/entities';

export class GetPartyMembersWithStatsQuery implements IQuery {
  constructor(public readonly user: UserEntity) {}
}
