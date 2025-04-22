import { httpResource } from '@angular/common/http';
import { computed, Injectable } from '@angular/core';
import { isAuthenticatedMapper } from './mappers/is-authenticated.mapper';
import { mapUserToEntity } from './mappers/user-logged.mapper';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #isAuthenticated = httpResource<boolean>('auth/is-authenticated', {
    defaultValue: false,
    parse: isAuthenticatedMapper,
  });
  readonly #shouldFetch = computed(() => this.#isAuthenticated.value());
  readonly #currentUser = httpResource(() => (this.#shouldFetch() ? 'auth/current-user' : undefined), {
    defaultValue: null,
    parse: mapUserToEntity,
  });

  public readonly isAuthenticated = this.#isAuthenticated.asReadonly();
  public readonly currentUser = this.#currentUser.asReadonly();

  public setIsAuthenticated(value: boolean) {
    this.#isAuthenticated.set(value);
  }
}
