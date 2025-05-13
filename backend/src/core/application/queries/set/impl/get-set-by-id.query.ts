import { UserEntity } from '../../../../domain/entities';

export class GetSetByIdQuery {
  constructor(
    public readonly setId: string,
    public readonly user: UserEntity,
  ) {}
}
