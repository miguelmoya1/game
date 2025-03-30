import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { catchError } from 'rxjs';
import {
  ERROR_HANDLER_SERVICE,
  ErrorHandlerService,
} from '../../services/error-handler/error-handler.service.contract';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  #logger = new Logger(ErrorsInterceptor.name);

  constructor(
    @Inject(ERROR_HANDLER_SERVICE)
    private readonly _errorHandler: ErrorHandlerService,
  ) {}

  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        this.#logger.error(error);

        this._errorHandler.handleException(error as Error);

        throw error;
      }),
    );
  }
}
