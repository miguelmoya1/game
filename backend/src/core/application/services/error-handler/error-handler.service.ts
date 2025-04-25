import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ErrorCodes } from '../../../domain/enums/impl/error-codes.enums';
import { ErrorHandlerService } from './error-handler.service.contract';

@Injectable()
export class ErrorHandlerServiceImpl implements ErrorHandlerService {
  handleException(error: Error) {
    switch (error.message as ErrorCodes) {
      // --- Bad Request (400) ---
      case ErrorCodes.PLACE_MISSING_LAT_LNG:
      case ErrorCodes.USER_OR_PASSWORD_INVALID:
      case ErrorCodes.HASH_EXPIRED:
        throw new HttpException(error.message, HttpStatus.BAD_REQUEST);

      // --- Unauthorized (401) ---
      case ErrorCodes.UNAUTHORIZED:
        throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);

      // --- Not Found (404) ---
      case ErrorCodes.ACCOUNT_NOT_FOUND:
      case ErrorCodes.USER_NOT_FOUND:
      case ErrorCodes.PLACE_NOT_FOUND:
      case ErrorCodes.ITEM_NOT_FOUND:
        throw new HttpException(error.message, HttpStatus.NOT_FOUND);

      // --- Conflict (409) ---
      case ErrorCodes.USER_ALREADY_EXISTS:
        throw new HttpException(error.message, HttpStatus.CONFLICT);

      // --- Internal Server Error (500) ---
      case ErrorCodes.CANNOT_ACTIVATE_ACCOUNT:
      case ErrorCodes.ERROR_REGISTERING_USER:
      case ErrorCodes.USER_NOT_CREATED:
      case ErrorCodes.PLACE_NOT_CREATED:
      case ErrorCodes.INTERNAL_SERVER_ERROR:
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      // --- Default Case ---
      default:
        throw new HttpException(
          ErrorCodes.INTERNAL_SERVER_ERROR,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
  }
}
