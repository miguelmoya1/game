import { InjectionToken, Signal } from '@angular/core';
import { AuthTokenServiceImpl } from './auth-token.service';

export interface AuthTokenService {
  token: Signal<string>;
  hasToken: Signal<boolean>;
  setToken(value: string): void;
  removeToken(): void;
}

export const AUTH_TOKEN_SERVICE = new InjectionToken<AuthTokenService>(
  'AuthTokenService',
  {
    providedIn: 'root',
    factory: () => new AuthTokenServiceImpl(),
  }
);
