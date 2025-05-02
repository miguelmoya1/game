import { UserEntity } from '../../../../domain/entities';

export class GetPlayerByIdQuery {
  constructor(
    public readonly playerId: string,
    public readonly user: UserEntity,
  ) {}
}
