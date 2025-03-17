import { inject } from '../../../../di/di-manager.ts';
import type { CreateAccountDto } from '../../../infrastructure/data/dtos/auth/create-account.dto.ts';
import type { CreateUserDto } from '../../../infrastructure/data/dtos/user/create-user.dto.ts';
import { ACCOUNT_USE_CASE } from '../../use-cases/account.use-case.contract.ts';

export interface RegisterCommandParams {
  createAccountDto: CreateAccountDto;
  createUserDto: CreateUserDto;
}

export class RegisterCommand {
  readonly #accountUseCase = inject(ACCOUNT_USE_CASE);

  execute(command: RegisterCommandParams) {
    return this.#accountUseCase.create(command.createUserDto, command.createAccountDto);
  }
}
