import { computed, effect, inject, Injectable } from '@angular/core';
import { USER_REPOSITORY } from '@game/repositories';
import { AUTH_USE_CASE } from '../contracts/auth.use-case.contract';
import { UserUseCase } from '../contracts/user.use-case.contract';

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
