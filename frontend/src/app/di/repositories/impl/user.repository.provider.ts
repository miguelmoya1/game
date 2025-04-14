import { USER_REPOSITORY, UserRepositoryImpl } from '@game/repositories';

export const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};
