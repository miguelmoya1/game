import { UserEntity } from '../../../../domain/entities';

export class GetPointQuery {
  constructor(
    public readonly placeId: string,
    public readonly user: UserEntity,
  ) {}
}
