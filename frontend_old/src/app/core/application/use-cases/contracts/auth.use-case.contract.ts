import { InjectionToken, Resource } from '@angular/core';

export interface AuthUseCase {
  readonly isAuthenticated: Resource<boolean | undefined>;

  login(email: string, password: string): Promise<boolean>;
  logout(): void;
}

export const AUTH_USE_CASE = new InjectionToken<AuthUseCase>('AUTH_USE_CASE');
