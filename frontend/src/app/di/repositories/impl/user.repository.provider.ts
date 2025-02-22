import { USER_REPOSITORY } from '@game/interfaces';
import { UserRepositoryImpl } from '@game/repositories';

export const userRepositoryProvider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};
