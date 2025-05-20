import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AUTH_TOKEN_SERVICE } from '../services/auth';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  const authTokenService = inject(AUTH_TOKEN_SERVICE);
  const hasToken = authTokenService.hasToken();

  if (hasToken) {
    const token = authTokenService.token();

    req = req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req);
};
