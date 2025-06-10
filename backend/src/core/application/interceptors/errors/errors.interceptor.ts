import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { catchError } from 'rxjs';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  #logger = new Logger(ErrorsInterceptor.name);

  intercept(_: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      catchError((error: Error) => {
        this.#logger.error(error.message);

        throw error;
      }),
    );
  }
}
