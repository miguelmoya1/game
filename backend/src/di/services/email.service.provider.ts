import { EMAIL_SERVICE } from '../../core/application/services/email/email.service.contract.ts';
import { EmailServiceImpl } from '../../core/application/services/email/email.service.ts';
import type { Provider } from '../di-manager.ts';

export const emailServiceProvider: Provider = {
  provide: EMAIL_SERVICE,
  useClass: EmailServiceImpl,
};
