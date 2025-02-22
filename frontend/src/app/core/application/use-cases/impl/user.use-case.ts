import { inject, Injectable, resource } from '@angular/core';
import { USER_REPOSITORY } from '@game/interfaces';
import { AUTH_USE_CASE, UserUseCase } from '@game/use-cases-contracts';

@Injectable()
export class UserUseCaseImpl implements UserUseCase {
  readonly #userRepository = inject(USER_REPOSITORY);
  readonly #authUseCase = inject(AUTH_USE_CASE);

  readonly userLogged = resource({
    request: () => ({
      isLogged: this.#authUseCase.isAuthenticated.value(),
    }),
    loader: async ({ request: { isLogged } }) => {
      if (!isLogged) {
        return undefined;
      }

      return this.#userRepository.getLogged();
    },
  });
}
