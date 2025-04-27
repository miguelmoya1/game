import { UserEntity } from '../../../domain/entities';

export class GetItemByIdQuery {
  constructor(
    public readonly itemId: string,
    public readonly user: UserEntity,
  ) {}
}
