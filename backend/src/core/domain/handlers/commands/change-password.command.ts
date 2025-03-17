import { inject } from '../../../../di/di-manager.ts';
import { ACCOUNT_USE_CASE } from '../../use-cases/account.use-case.contract.ts';

export interface ChangePasswordCommandParams {
  hashForPasswordReset: string;
  password: string;
}

export class ChangePasswordCommand {
  readonly #accountUseCase = inject(ACCOUNT_USE_CASE);

  execute(command: ChangePasswordCommandParams) {
    return this.#accountUseCase.changePassword(command.hashForPasswordReset, command.password);
  }
}
