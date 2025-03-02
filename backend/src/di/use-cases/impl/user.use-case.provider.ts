import { UserUseCaseImpl } from '@game/use-cases';
import { USER_USE_CASE, UserUseCase } from '@game/use-cases-contracts';
import { Provider } from '@nestjs/common';

export const UserUseCaseProvider: Provider<UserUseCase> = {
  provide: USER_USE_CASE,
  useClass: UserUseCaseImpl,
};
