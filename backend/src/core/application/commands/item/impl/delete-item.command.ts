import { UserEntity } from '../../../../domain/entities';

export class DeleteItemCommand {
  constructor(
    public readonly itemId: string,
    public readonly user: UserEntity,
  ) {}
}
