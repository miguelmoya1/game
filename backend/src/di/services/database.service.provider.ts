import { DATABASE_SERVICE } from '../../core/application/services/database/database.service.contract.ts';
import { DatabaseServiceImpl } from '../../core/application/services/database/database.service.ts';
import type { Provider } from '../di-manager.ts';

export const databaseServiceProvider: Provider = {
  provide: DATABASE_SERVICE,
  useClass: DatabaseServiceImpl,
};
