import { UserEntity } from '../../../../domain/entities';

export class GetPlayerByUserIdQuery {
  constructor(
    public readonly userId: string,
    public readonly user: UserEntity,
  ) {}
}
