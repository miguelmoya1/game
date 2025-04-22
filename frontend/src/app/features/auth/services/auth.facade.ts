import { inject, Injectable } from '@angular/core';
import { AuthTokenService } from '@game/core/services/auth-token.service';
import { AuthService } from '@game/core/services/auth.service';
import { AUTH_API_SERVICE } from '../data-access/auth-api.service.contract';
import { LoginEmailDto } from '../data-access/dto/login-email.dto';
import { RegisterDto } from '../data-access/dto/register.dto';
import { AuthFacadeContract } from './auth.facade.contract';

@Injectable()
export class AuthFacade implements AuthFacadeContract {
  readonly #authApiService = inject(AUTH_API_SERVICE);
  readonly #authService = inject(AuthService);
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
