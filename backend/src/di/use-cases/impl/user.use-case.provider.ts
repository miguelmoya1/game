import { Provider } from '@nestjs/common';
import {
  USER_USE_CASE,
  UserUseCase,
  UserUseCaseImpl,
} from '../../../core/application/use-cases';

export const UserUseCaseProvider: Provider<UserUseCase> = {
  provide: USER_USE_CASE,
  useClass: UserUseCaseImpl,
};
