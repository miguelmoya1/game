import { UserEntity } from 'src/core/domain/entities';

export class GetNearbyDungeonsQuery {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
    public readonly radiusKm: number,
    public readonly user: UserEntity,
  ) {}
}
