import { ErrorCodes } from '@game/enums';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ErrorHandlerService {
  handleException(error: Error) {
    if (error.message in ErrorCodes) {
      switch (error.message) {
        case ErrorCodes.INTERNAL_SERVER_ERROR:
          throw new HttpException(ErrorCodes.INTERNAL_SERVER_ERROR, HttpStatus.INTERNAL_SERVER_ERROR);
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
