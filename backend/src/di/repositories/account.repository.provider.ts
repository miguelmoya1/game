import { ACCOUNT_REPOSITORY } from '../../core/domain/interfaces/account.repository.ts';
import { AccountRepositoryImpl } from '../../core/infrastructure/repositories/account.repository.ts';
import type { Provider } from '../di-manager.ts';

export const accountRepositoryProvider: Provider = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepositoryImpl,
};
