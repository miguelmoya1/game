import { inject, Injectable } from '@angular/core';
import { AuthGlobalService, AuthTokenService } from '@game/core';
import { AUTH_API_SERVICE } from '../data-access/auth-api.service.contract';
import { LoginEmailDto } from '../data-access/dto/login-email.dto';
import { RegisterDto } from '../data-access/dto/register.dto';
import { AuthService } from './auth.service.contract';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #authApiService = inject(AUTH_API_SERVICE);
  readonly #authService = inject(AuthGlobalService);
  readonly #authTokenService = inject(AuthTokenService);

  public async register(registerDto: RegisterDto) {
    const response = await this.#authApiService.register(registerDto);

    this.#authService.setIsAuthenticated(true);
    this.#authTokenService.setToken(response);

    return Boolean(response);
  }

  public async loginEmail(loginDto: LoginEmailDto) {
    const response = await this.#authApiService.loginEmail(loginDto);

    this.#authService.setIsAuthenticated(true);
    this.#authTokenService.setToken(response);

    return Boolean(response);
  }
}
