import { User } from '../../../domain/entities';

export class GetPlacesQuery {
  constructor(
    public readonly lat: number,
    public readonly lng: number,
    public readonly user: User,
  ) {}
}
