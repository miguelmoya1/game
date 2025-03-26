import { UserUseCaseImpl } from '../../core/application/use-cases/user/user.use-case.ts';
import { USER_USE_CASE } from '../../core/domain/use-cases/user.use-case.contract.ts';
import type { Provider } from '../di-manager.ts';

export const userUseCaseProvider: Provider = {
  provide: USER_USE_CASE,
  useClass: UserUseCaseImpl,
};
