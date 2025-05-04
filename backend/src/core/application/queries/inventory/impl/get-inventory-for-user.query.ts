import { UserEntity } from '../../../../domain/entities';

export class GetInventoryForUserQuery {
  constructor(public readonly user: UserEntity) {}
}
