import { Provider } from '@nestjs/common';
import {
  ACCOUNT_REPOSITORY,
  AccountRepository,
  AccountRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const accountRepositoryProvider: Provider<AccountRepository> = {
  provide: ACCOUNT_REPOSITORY,
  useClass: AccountRepositoryImpl,
};
