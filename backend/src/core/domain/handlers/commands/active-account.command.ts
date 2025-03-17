import { inject } from '../../../../di/di-manager.ts';
import { ACCOUNT_USE_CASE } from '../../use-cases/account.use-case.contract.ts';

export interface ActiveAccountCommandParams {
  accountId: string;
}

export class ActiveAccountCommand {
  readonly #accountUseCase = inject(ACCOUNT_USE_CASE);

  execute(command: ActiveAccountCommandParams) {
    return this.#accountUseCase.confirm(command.accountId);
  }
}
