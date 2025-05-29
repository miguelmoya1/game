import { Provider } from '@nestjs/common';
import {
  STATIC_DATA_LOADER,
  StaticDataLoader,
  StaticDataLoaderImpl,
} from '../../../core/infrastructure/repositories';

export const staticDataLoadedRepositoryProvider: Provider<StaticDataLoader> = {
  provide: STATIC_DATA_LOADER,
  useClass: StaticDataLoaderImpl,
};
