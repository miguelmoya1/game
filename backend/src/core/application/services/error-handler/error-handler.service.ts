import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorCodes } from '../../../domain/enums';
import { ErrorHandlerService } from './error-handler.service.contract';

@Injectable()
export class ErrorHandlerServiceImpl implements ErrorHandlerService {
  handleException(error: Error) {
    if (error.message in ErrorCodes) {
      if (error.message.includes(ErrorCodes.INTERNAL_SERVER_ERROR)) {
        throw new HttpException(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (error.message.includes('NOT_FOUND')) {
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);
      }

      if (error.message.includes('BAD_REQUEST')) {
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
      }

      if (error.message.includes('FORBIDDEN')) {
        throw new HttpException(error.message, HttpStatus.FORBIDDEN);
      }

      if (error.message.includes('UNAUTHORIZED')) {
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
      }

      if (
        error.message.includes('CONFLICT') ||
        error.message.includes('DUPLICATE') ||
        error.message.includes('ALREADY_EXISTS')
      ) {
        throw new HttpException(error.message, HttpStatus.CONFLICT);
      }

      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
