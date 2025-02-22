import { HttpClient, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { ApplicationConfig, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { authRepositoryProvider, translateRepositoryProvider, userRepositoryProvider } from '@game/di/repositories';
import { authUseCaseProvider, userUseCaseProvider } from '@game/di/use-cases';
import { baseUrlInterceptor, headerInterceptor } from '@game/interceptors';
import { provideTranslateService, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';

const httpLoaderFactory = (http: HttpClient) => new TranslateHttpLoader(http, './i18n/', '.json');

export const appConfig: ApplicationConfig = {
  providers: [
    provideExperimentalZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),
    provideHttpClient(withFetch(), withInterceptors([headerInterceptor, baseUrlInterceptor])),
    provideAnimationsAsync(),
    provideTranslateService({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: httpLoaderFactory,
        deps: [HttpClient],
      },
    }),

    authRepositoryProvider,
    userRepositoryProvider,
    translateRepositoryProvider,

    authUseCaseProvider,
    userUseCaseProvider,
  ],
};
