import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
import { LoginWithEmailCommand } from '../impl/login-with-email.command';

@CommandHandler(LoginWithEmailCommand)
export class LoginWithEmailHandler
  implements ICommandHandler<LoginWithEmailCommand>
{
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(command: LoginWithEmailCommand) {
    const { email, password } = command;

    return await this._accountUseCase.signInWithEmail(email, password);
  }
}
