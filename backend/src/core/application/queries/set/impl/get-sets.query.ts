import { UserEntity } from '../../../../domain/entities';

export class GetSetsQuery {
  constructor(public readonly user: UserEntity) {}
}
