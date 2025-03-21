import { User } from '../../../domain/entities/user.entity.ts';
import type { UserUseCase } from '../../../domain/use-cases/user.use-case.contract.ts';
import type { UpdateUserDto } from '../../../infrastructure/data/dtos/user/update-user.dto.ts';

export class UserUseCaseMock implements UserUseCase {
  async getById(userId: string) {
    return null;
  }

  async update(updateUserDto: UpdateUserDto, userId: string, user: User) {
    return true;
  }
}
