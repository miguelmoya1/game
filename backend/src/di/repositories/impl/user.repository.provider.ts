import { USER_REPOSITORY, UserRepository } from '@game/interfaces';
import { UserRepositoryImpl } from '@game/repositories';
import { Provider } from '@nestjs/common';

export const userRepositoryProvider: Provider<UserRepository> = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};
