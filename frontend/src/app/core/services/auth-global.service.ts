import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable } from '@angular/core';
import { AuthTokenService } from './auth-token.service';
import { isAuthenticatedMapper } from './mappers/is-authenticated.mapper';
import { mapUserToEntity } from './mappers/user-logged.mapper';

@Injectable({
  providedIn: 'root',
})
export class AuthGlobalService {
  readonly #authTokenService = inject(AuthTokenService);

  readonly #isAuthenticated = httpResource<boolean>(
    () => (this.#authTokenService.hasToken() ? 'auth/is-authenticated' : undefined),
    {
      defaultValue: false,
      parse: isAuthenticatedMapper,
    },
  );

  readonly #shouldFetch = computed(() => this.#isAuthenticated.value());
  readonly #currentUser = httpResource(() => (this.#shouldFetch() ? 'users/me' : undefined), {
    parse: mapUserToEntity,
  });

  public readonly isAuthenticated = this.#isAuthenticated.asReadonly();
  public readonly currentUser = this.#currentUser.asReadonly();

  public setIsAuthenticated(value: boolean) {
    this.#isAuthenticated.set(value);
  }
}
