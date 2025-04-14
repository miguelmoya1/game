import { AUTH_REPOSITORY, AuthRepositoryImpl } from '@game/repositories';

export const authRepositoryProvider = {
  provide: AUTH_REPOSITORY,
  useClass: AuthRepositoryImpl,
};
