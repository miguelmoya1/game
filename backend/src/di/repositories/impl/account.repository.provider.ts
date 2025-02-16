import { ACCOUNT_REPOSITORY, AccountRepository } from '@game/interfaces';
import { AccountRepositoryImpl } from '@game/repositories';
import { Provider } from '@nestjs/common';

export const accountRepositoryProvider: Provider<AccountRepository> = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepositoryImpl,
};
