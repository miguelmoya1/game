import { Provider } from '@nestjs/common';
import { EmailServiceImpl } from '../../../core/application/services/email/email.service';
import {
  EMAIL_SERVICE,
  EmailService,
} from '../../../core/application/services/email/email.service.contract';

export const emailServiceProvider: Provider<EmailService> = {
  provide: EMAIL_SERVICE,
  useClass: EmailServiceImpl,
};
