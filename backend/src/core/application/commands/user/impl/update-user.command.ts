import { UserEntity } from '../../../../domain/entities';
import { UpdateUserDataDto } from '../dto/update-user-data.dto';

export class UpdateUserCommand {
  constructor(
    public readonly userUpdateDto: UpdateUserDataDto,
    public readonly userId: string,
    public readonly user: UserEntity,
  ) {}
}
