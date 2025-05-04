import { UserEntity } from '../../../../domain/entities';

export class ClaimPlaceItemCommand {
  constructor(
    public readonly placeId: string,
    public readonly user: UserEntity,
  ) {}
}
