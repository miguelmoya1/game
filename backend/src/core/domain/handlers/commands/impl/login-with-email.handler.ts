import { LoginWithEmailCommand } from '@game/commands';
import { ACCOUNT_USE_CASE, AccountUseCase } from '@game/use-cases-contracts';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

@CommandHandler(LoginWithEmailCommand)
export class LoginWithEmailHandler implements ICommandHandler<LoginWithEmailCommand> {
  constructor(@Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase) {}

  async execute(command: LoginWithEmailCommand) {
    const { email, password } = command;

    return await this._accountUseCase.signInWithEmail(email, password);
  }
}
