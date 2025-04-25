import { UserEntity } from '../../../domain/entities';
import { UpdateUserDto } from '../../../infrastructure/dto';

export class UpdateUserCommand {
  constructor(
    public readonly userUpdateDto: UpdateUserDto,
    public readonly userId: string,
    public readonly user: UserEntity,
  ) {}
}
