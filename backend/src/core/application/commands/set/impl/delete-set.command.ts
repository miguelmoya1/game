import { UserEntity } from '../../../../domain/entities';

export class DeleteSetCommand {
  constructor(
    public readonly setId: string,
    public readonly user: UserEntity,
  ) {}
}
