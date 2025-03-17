import { USER_REPOSITORY } from '../../core/domain/interfaces/user.repository.ts';
import { UserRepositoryImpl } from '../../core/infrastructure/repositories/user.repository.ts';
import type { Provider } from '../di-manager.ts';

export const userRepositoryProvider: Provider = {
  provide: USER_REPOSITORY,
  useClass: UserRepositoryImpl,
};
