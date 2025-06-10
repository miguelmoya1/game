import { Provider } from '@nestjs/common';
import { DATABASE_SERVICE, DatabaseService, DatabaseServiceImpl } from '../../../core/application/services';

export const databaseServiceProvider: Provider<DatabaseService> = {
  provide: DATABASE_SERVICE,
  useClass: DatabaseServiceImpl,
};
