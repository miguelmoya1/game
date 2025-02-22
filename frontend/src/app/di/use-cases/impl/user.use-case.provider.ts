import { UserUseCaseImpl } from '@game/use-cases';
import { USER_USE_CASE } from '@game/use-cases-contracts';

export const userUseCaseProvider = {
  provide: USER_USE_CASE,
  useClass: UserUseCaseImpl,
};
