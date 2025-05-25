import { UserEntity } from 'src/core/domain/entities';

export class GetDungeonDetailsQuery {
  constructor(
    public readonly dungeonId: string,
    public readonly user: UserEntity,
  ) {}
}
