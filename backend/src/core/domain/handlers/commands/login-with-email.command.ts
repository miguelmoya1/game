import { inject } from '../../../../di/di-manager.ts';
import { ACCOUNT_USE_CASE } from '../../use-cases/account.use-case.contract.ts';

export interface LoginWithEmailCommandParams {
  email: string;
  password: string;
}

export class LoginWithEmailCommand {
  readonly #accountUseCase = inject(ACCOUNT_USE_CASE);

  execute(command: LoginWithEmailCommandParams) {
    return this.#accountUseCase.signInWithEmail(command.email, command.password);
  }
}
