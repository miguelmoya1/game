import { AccountUseCaseImpl } from '../../core/application/use-cases/account/account.use-case.ts';
import { ACCOUNT_USE_CASE } from '../../core/domain/use-cases/account.use-case.contract.ts';
import type { Provider } from '../di-manager.ts';

export const accountUseCaseProvider: Provider = {
  provide: ACCOUNT_USE_CASE,
  useClass: AccountUseCaseImpl,
};
