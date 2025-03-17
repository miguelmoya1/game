import { inject } from '../../../../di/di-manager.ts';
import type { UpdateUserDto } from '../../../infrastructure/data/dtos/user/update-user.dto.ts';
import { User } from '../../entities/user.entity.ts';
import { USER_USE_CASE } from '../../use-cases/user.use-case.contract.ts';

export interface UpdateUserCommandParams {
  userUpdateDto: UpdateUserDto;
  userId: string;
  user: User;
}

export class UpdateUserCommand {
  readonly #userUseCase = inject(USER_USE_CASE);

  execute(command: UpdateUserCommandParams) {
    const { userUpdateDto, userId, user } = command;

    return this.#userUseCase.update(userUpdateDto, userId, user);
  }
}
