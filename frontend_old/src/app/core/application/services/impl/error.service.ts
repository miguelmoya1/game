import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  public prepareError(error: unknown) {
    if (error instanceof HttpErrorResponse) {
      const { message } = error.error;

      if (Array.isArray(message)) {
        return message[0];
      }

      return message;
    }

    if (error instanceof Error) {
      return error.message;
    }

    return 'An unexpected error occurred';
  }
}
