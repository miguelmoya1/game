import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AccountUseCase } from '../../use-cases';
import { ACCOUNT_USE_CASE } from '../../use-cases/contracts/account.use-case.contract';
import { RegisterCommand } from '../impl/register.command';

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
  constructor(
    @Inject(ACCOUNT_USE_CASE) private readonly _accountUseCase: AccountUseCase,
  ) {}

  async execute(command: RegisterCommand) {
    const { createAccountDto, createUserDto } = command;

    return await this._accountUseCase.create(createUserDto, createAccountDto);
  }
}
