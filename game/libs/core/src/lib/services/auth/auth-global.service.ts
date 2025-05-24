import { httpResource } from '@angular/common/http';
import { computed, effect, inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGlobalService } from './auth-global.service.contract';
import { AUTH_TOKEN_SERVICE } from './auth-token.service.contract';
import { isAuthenticatedMapper } from './mappers/is-authenticated.mapper';
import { mapUserToEntity } from './mappers/user-logged.mapper';

@Injectable()
export class AuthGlobalServiceImpl implements AuthGlobalService {
  readonly #authTokenService = inject(AUTH_TOKEN_SERVICE);
  readonly #router = inject(Router);

  readonly #isAuthenticated = httpResource<boolean>(
    () =>
      this.#authTokenService.hasToken() ? 'auth/is-authenticated' : undefined,
    {
      defaultValue: false,
      parse: isAuthenticatedMapper,
    },
  );

  readonly #shouldFetch = computed(() => this.#isAuthenticated.value());
  readonly #currentUser = httpResource(
    () => (this.#shouldFetch() ? 'users/me' : undefined),
    {
      parse: mapUserToEntity,
    },
  );

  public readonly isAuthenticated = this.#isAuthenticated.asReadonly();
  public readonly currentUser = this.#currentUser.asReadonly();

  public setIsAuthenticated(value: boolean) {
    this.#isAuthenticated.set(value);
  }

  constructor() {
    effect(() => {
      const userError = this.#currentUser.error();

      if (userError) {
        this.#authTokenService.removeToken();
        this.#isAuthenticated.set(false);
        this.#router.navigate(['/auth/login']);
      }
    });
  }
}
