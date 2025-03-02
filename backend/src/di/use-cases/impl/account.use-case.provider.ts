import { AccountUseCaseImpl } from '@game/use-cases';
import { ACCOUNT_USE_CASE, AccountUseCase } from '@game/use-cases-contracts';
import { Provider } from '@nestjs/common';

export const accountUseCaseProvider: Provider<AccountUseCase> = {
  provide: ACCOUNT_USE_CASE,
  useClass: AccountUseCaseImpl,
};
