import { UserEntity } from '../../../../domain/entities';

export class GetPlaceQuery {
  constructor(
    public readonly placeId: string,
    public readonly user: UserEntity,
  ) {}
}
