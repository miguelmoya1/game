import { AUTH_USE_CASE, AuthUseCaseImpl } from '@game/use-cases';

export const authUseCaseProvider = {
  provide: AUTH_USE_CASE,
  useClass: AuthUseCaseImpl,
};
