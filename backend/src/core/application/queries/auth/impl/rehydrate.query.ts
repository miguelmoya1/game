import { UserEntity } from '../../../../domain/entities';

export class RehydrateQuery {
  constructor(public readonly user: UserEntity) {}
}
