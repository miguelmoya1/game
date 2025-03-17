import { inject } from '../../../../di/di-manager.ts';
import { ACCOUNT_USE_CASE } from '../../use-cases/account.use-case.contract.ts';

export interface ForgotPasswordCommandParams {
  email: string;
}

export class ForgotPasswordCommand {
  readonly #accountUseCase = inject(ACCOUNT_USE_CASE);

  execute(command: ForgotPasswordCommandParams) {
    return this.#accountUseCase.forgotPassword(command.email);
  }
}
