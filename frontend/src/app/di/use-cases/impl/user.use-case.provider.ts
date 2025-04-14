import { USER_USE_CASE, UserUseCaseImpl } from '@game/use-cases';

export const userUseCaseProvider = {
  provide: USER_USE_CASE,
  useClass: UserUseCaseImpl,
};
