import { UserEntity } from '../../../../domain/entities';

export class GetSetListQuery {
  constructor(public readonly user: UserEntity) {}
}
