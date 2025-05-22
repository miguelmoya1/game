import { InjectionToken } from '@angular/core';
import { LoginEmailDto } from './dto/login-email.dto';
import { RegisterDto } from './dto/register.dto';

export type AuthApiService = {
  loginEmail(loginEmailDto: LoginEmailDto): Promise<string>;
  register(registerDto: RegisterDto): Promise<void>;
  checkEmailExists(email: string): Promise<boolean>;
};

export const AUTH_API_SERVICE = new InjectionToken<AuthApiService>(
  'AUTH_API_SERVICE'
);
