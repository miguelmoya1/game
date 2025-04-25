import { UserEntity } from '../../../domain/entities';

export class GetPlaceQuery {
  constructor(
    public readonly id: string,
    public readonly user: UserEntity,
  ) {}
}
