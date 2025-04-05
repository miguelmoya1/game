import { Provider } from '@nestjs/common';
import { DatabaseServiceImpl } from '../../../core/application/services/database/database.service';
import {
  DATABASE_SERVICE,
  DatabaseService,
} from '../../../core/application/services/database/database.service.contract';

export const databaseServiceProvider: Provider<DatabaseService> = {
  provide: DATABASE_SERVICE,
  useClass: DatabaseServiceImpl,
};
