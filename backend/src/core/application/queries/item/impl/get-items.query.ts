import { UserEntity } from '../../../../domain/entities';

export class GetItemsQuery {
  constructor(public readonly user: UserEntity) {}
}
