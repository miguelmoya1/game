import { Provider } from '@nestjs/common';
import { EncryptionServiceImpl } from '../../../core/application/services/encryption/encryption.service';
import {
  ENCRYPTION_SERVICE,
  EncryptionService,
} from '../../../core/application/services/encryption/encryption.service.contract';

export const encryptionServiceProvider: Provider<EncryptionService> = {
  provide: ENCRYPTION_SERVICE,
  useClass: EncryptionServiceImpl,
};
