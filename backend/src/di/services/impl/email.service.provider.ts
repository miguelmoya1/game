import { Provider } from '@nestjs/common';
import {
  EMAIL_SERVICE,
  EmailService,
  EmailServiceImpl,
} from '../../../core/application/services';

export const emailServiceProvider: Provider<EmailService> = {
  provide: EMAIL_SERVICE,
  useClass: EmailServiceImpl,
};
