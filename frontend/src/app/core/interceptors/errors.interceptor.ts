import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NotificationService } from '@game/core/services/notification.service';
import { catchError } from 'rxjs';

export const errorsInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error) => {
      if (req.url.includes('is-authenticated') || req.url.includes('rehydrate')) {
        return next(req);
      }

      const errorMessage = error.error?.message || error.message || 'Unknown error';

      notificationService.add(errorMessage, 'error');

      throw error;
    }),
  );
};
