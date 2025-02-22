import { InjectionToken } from '@angular/core';

export interface AuthRepository {
  isAuthenticated(): Promise<boolean>;
  login(email: string, password: string): Promise<string | undefined>;
  rehydrate(): Promise<string | undefined>;
}

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>(
  'AUTH_REPOSITORY',
);
