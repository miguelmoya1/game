import { ErrorHandlerService } from '@game/services';
import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  #logger = new Logger(ErrorsInterceptor.name);

  constructor(private readonly _errorHandler: ErrorHandlerService) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error) => {
        this.#logger.error(error);

        this._errorHandler.handleException(error);

        throw error;
      }),
    );
  }
}
