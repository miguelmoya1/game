import { computed, effect, inject, Injectable } from '@angular/core';
import { USER_REPOSITORY } from '@game/interfaces';
import { AUTH_USE_CASE, UserUseCase } from '@game/use-cases-contracts';

@Injectable()
export class UserUseCaseImpl implements UserUseCase {
  readonly #userRepository = inject(USER_REPOSITORY);
  readonly #authUseCase = inject(AUTH_USE_CASE);

  readonly #shouldFetchUser = computed(() => !!this.#authUseCase.isAuthenticated.value());

  constructor() {
    effect(() => {
      this.#userRepository.setShouldFetchLogged(this.#shouldFetchUser());
    });
  }

  get userLogged() {
    return this.#userRepository.logged;
  }
}
