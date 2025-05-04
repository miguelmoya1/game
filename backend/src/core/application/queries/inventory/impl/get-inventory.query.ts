import { UserEntity } from '../../../../domain/entities';

export class GetInventoryQuery {
  constructor(
    public readonly playerId: string,
    public readonly user: UserEntity,
  ) {}
}
