import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ACCOUNT_USE_CASE, AccountUseCase } from '../../use-cases';
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
