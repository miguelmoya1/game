import { Provider } from '@nestjs/common';
import { ErrorHandlerServiceImpl } from '../../../core/application/services/error-handler/error-handler.service';
import {
  ERROR_HANDLER_SERVICE,
  ErrorHandlerService,
} from '../../../core/application/services/error-handler/error-handler.service.contract';

export const errorHandlerServiceProvider: Provider<ErrorHandlerService> = {
  provide: ERROR_HANDLER_SERVICE,
  useClass: ErrorHandlerServiceImpl,
};
