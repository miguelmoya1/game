import { Provider } from '@nestjs/common';
import { PermissionsServiceImpl } from '../../../core/application/services/permissions/permissions.service';
import {
  PERMISSIONS_SERVICE,
  PermissionsService,
} from '../../../core/application/services/permissions/permissions.service.contract';

export const permissionsServiceProvider: Provider<PermissionsService> = {
  provide: PERMISSIONS_SERVICE,
  useClass: PermissionsServiceImpl,
};
