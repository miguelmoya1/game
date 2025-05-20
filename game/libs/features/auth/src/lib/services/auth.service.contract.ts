import { InjectionToken } from '@angular/core';
import { LoginEmailDto } from '../data-access/dto/login-email.dto';
import { RegisterDto } from '../data-access/dto/register.dto';

export interface AuthService {
  loginEmail(loginEmailDto: LoginEmailDto): Promise<boolean>;
  register(registerDto: RegisterDto): Promise<boolean>;
}

export const AUTH_SERVICE = new InjectionToken<AuthService>('AUTH_SERVICE');
