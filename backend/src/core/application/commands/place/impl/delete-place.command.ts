import { UserEntity } from '../../../../domain/entities';

export class DeletePlaceCommand {
  constructor(
    public readonly placeId: string,
    public readonly user: UserEntity,
  ) {}
}
