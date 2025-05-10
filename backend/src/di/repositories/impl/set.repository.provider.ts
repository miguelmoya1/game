import { Provider } from '@nestjs/common';
import {
  SET_REPOSITORY,
  SetRepository,
  SetRepositoryImpl,
} from '../../../core/infrastructure/repositories';

export const setRepositoryProvider: Provider<SetRepository> = {
  provide: SET_REPOSITORY,
  useClass: SetRepositoryImpl,
};
