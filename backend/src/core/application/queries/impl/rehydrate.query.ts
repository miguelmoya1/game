import { UserEntity } from '../../../domain/entities/impl/user.entity';

export class RehydrateQuery {
  constructor(public readonly user: UserEntity) {}
}
