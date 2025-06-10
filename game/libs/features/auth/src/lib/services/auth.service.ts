import { httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AUTH_API_SERVICE } from '../data-access/auth-api.service.contract';
import { LoginEmailDto } from '../data-access/dto/login-email.dto';
import { RegisterDto } from '../data-access/dto/register.dto';
import { AUTH_TOKEN_SERVICE } from './auth-token.service.contract';
import { AuthService } from './auth.service.contract';
import { isAuthenticatedMapper } from './mappers/is-authenticated.mapper';

@Injectable()
export class AuthServiceImpl implements AuthService {
  readonly #authApiService = inject(AUTH_API_SERVICE);
  readonly #authTokenService = inject(AUTH_TOKEN_SERVICE);
  readonly #isAuthenticated = httpResource<boolean>(
    () =>
      this.#authTokenService.hasToken() ? 'auth/is-authenticated' : undefined,
    {
      defaultValue: false,
      parse: isAuthenticatedMapper,
    },
  );

  public readonly isAuthenticated = this.#isAuthenticated.asReadonly();

  public async register(registerDto: RegisterDto) {
    await this.#authApiService.register(registerDto);

    return true;
  }

  public async loginEmail(loginDto: LoginEmailDto) {
    const response = await this.#authApiService.loginEmail(loginDto);

    this.#isAuthenticated.set(true);
    this.#authTokenService.setToken(response);

    return Boolean(response);
  }

  public async checkEmailExists(email: string) {
    return await this.#authApiService.checkEmailExists(email);
  }
}
