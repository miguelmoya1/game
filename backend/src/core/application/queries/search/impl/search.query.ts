import { UserEntity } from '../../../../domain/entities';

export class SearchQuery {
  constructor(
    public readonly criteria: string,
    public readonly user: UserEntity,
  ) {}
}
