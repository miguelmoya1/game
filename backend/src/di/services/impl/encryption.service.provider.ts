import { Provider } from '@nestjs/common';
import { ENCRYPTION_SERVICE, EncryptionService, EncryptionServiceImpl } from '../../../core/application/services';

export const encryptionServiceProvider: Provider<EncryptionService> = {
  provide: ENCRYPTION_SERVICE,
  useClass: EncryptionServiceImpl,
};
