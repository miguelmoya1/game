import { UpdateUserDto } from '@game/data/dto';
import { User } from '@game/entities';

export class UpdateUserCommand {
  constructor(
    public readonly userUpdateDto: UpdateUserDto,
    public readonly userId: string,
    public readonly user: User,
  ) {}
}
