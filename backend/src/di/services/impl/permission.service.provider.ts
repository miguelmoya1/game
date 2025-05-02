import { Provider } from '@nestjs/common';
import {
  PERMISSIONS_SERVICE,
  PermissionsService,
  PermissionsServiceImpl,
} from '../../../core/application/services';

export const permissionsServiceProvider: Provider<PermissionsService> = {
  provide: PERMISSIONS_SERVICE,
  useClass: PermissionsServiceImpl,
};
