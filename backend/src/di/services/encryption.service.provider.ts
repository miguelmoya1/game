import { ENCRYPTION_SERVICE } from '../../core/application/services/encryption/encryption.service.contract.ts';
import { EncryptionServiceImpl } from '../../core/application/services/encryption/encryption.service.ts';
import type { Provider } from '../di-manager.ts';

export const encryptionServiceProvider: Provider = {
  provide: ENCRYPTION_SERVICE,
  useClass: EncryptionServiceImpl,
};
