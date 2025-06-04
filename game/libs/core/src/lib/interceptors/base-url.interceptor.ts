import { HttpInterceptorFn } from '@angular/common/http';
import { isDevMode } from '@angular/core';

const url = isDevMode() ? 'http://localhost:3000/' : 'https://api.game.io/';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const currentUrl = req.url;

  if (!currentUrl.startsWith('http') && !currentUrl.startsWith('.')) {
    req = req.clone({
      url: `${url}${currentUrl}`,
    });
  }

  return next(req);
};
