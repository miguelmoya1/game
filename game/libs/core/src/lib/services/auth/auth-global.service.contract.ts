import { InjectionToken, Resource } from '@angular/core';
import { UserEntity } from '../../models/user.entity';
import { AuthGlobalServiceImpl } from './auth-global.service';

export interface AuthGlobalService {
  readonly isAuthenticated: Resource<boolean>;
  readonly currentUser: Resource<UserEntity | undefined>;
  setIsAuthenticated(value: boolean): void;
}

export const AUTH_GLOBAL_SERVICE = new InjectionToken<AuthGlobalService>(
  'AUTH_GLOBAL_SERVICE',
  {
    providedIn: 'root',
    factory: () => new AuthGlobalServiceImpl(),
  }
);
