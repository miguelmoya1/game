import { UserEntity } from '../../../../domain/entities';

export class GetPointsQuery {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
    public readonly user: UserEntity,
  ) {}
}
