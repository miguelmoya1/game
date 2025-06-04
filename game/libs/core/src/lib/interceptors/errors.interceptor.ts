import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError } from 'rxjs';
import { NOTIFICATION_SERVICE } from '../services/notification';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NOTIFICATION_SERVICE);

  return next(req).pipe(
    catchError((error) => {
      if (
        req.url.includes('is-authenticated') ||
        req.url.includes('rehydrate')
      ) {
        return next(req);
      }

      const errorMessage =
        error.error?.message || error.message || 'Unknown error';

      notificationService.add(errorMessage, 'error');

      throw error;
    }),
  );
};
