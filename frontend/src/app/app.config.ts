import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { baseUrlInterceptor } from '@game/core/interceptors/base-url.interceptor';
import { errorsInterceptor } from '@game/core/interceptors/errors.interceptor';
import { headerInterceptor } from '@game/core/interceptors/header.interceptor';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, baseUrlInterceptor, errorsInterceptor])),
    provideAnimationsAsync(),
  ],
};
