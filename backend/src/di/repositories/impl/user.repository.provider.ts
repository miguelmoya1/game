import { Provider } from '@nestjs/common';
import {
  USER_REPOSITORY,
  UserRepository,
  UserRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const userRepositoryProvider: Provider<UserRepository> = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};
