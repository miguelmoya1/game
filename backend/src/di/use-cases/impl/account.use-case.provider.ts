import { Provider } from '@nestjs/common';
import {
  ACCOUNT_USE_CASE,
  AccountUseCase,
  AccountUseCaseImpl,
} from '../../../core/application/use-cases';

export const accountUseCaseProvider: Provider<AccountUseCase> = {
  provide: ACCOUNT_USE_CASE,
  useClass: AccountUseCaseImpl,
};
