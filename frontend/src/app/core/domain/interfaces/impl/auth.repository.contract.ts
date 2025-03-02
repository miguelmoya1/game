import { InjectionToken, ResourceRef } from '@angular/core';

export interface AuthRepository {
  readonly isAuthenticated: ResourceRef<boolean>;

  login(email: string, password: string): Promise<string | undefined>;
  rehydrate(): Promise<string | undefined>;
}

export const AUTH_REPOSITORY = new InjectionToken<AuthRepository>('AUTH_REPOSITORY');
