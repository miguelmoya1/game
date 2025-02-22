import { AuthUseCaseImpl } from '@game/use-cases';
import { AUTH_USE_CASE } from '@game/use-cases-contracts';

export const authUseCaseProvider = {
  provide: AUTH_USE_CASE,
  useClass: AuthUseCaseImpl,
};
