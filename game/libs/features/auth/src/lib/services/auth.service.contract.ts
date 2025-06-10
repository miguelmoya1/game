import { InjectionToken, Resource } from '@angular/core';
import { LoginEmailDto } from '../data-access/dto/login-email.dto';
import { RegisterDto } from '../data-access/dto/register.dto';
import { AuthServiceImpl } from './auth.service';

export interface AuthService {
  readonly isAuthenticated: Resource<boolean>;

  loginEmail(loginEmailDto: LoginEmailDto): Promise<boolean>;
  register(registerDto: RegisterDto): Promise<boolean>;
  checkEmailExists(email: string): Promise<boolean>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE', {
  providedIn: 'root',
  factory: () => new AuthServiceImpl(),
});
