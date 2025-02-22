import { AUTH_REPOSITORY } from '@game/interfaces';
import { AuthRepositoryImpl } from '@game/repositories';

export const authRepositoryProvider = {
  provide: AUTH_REPOSITORY,
  useClass: AuthRepositoryImpl,
};
