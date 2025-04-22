import { httpResource } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { mapUserToEntity } from '@game/mappers';
import { UserRepository } from '../contracts/user.repository.contract';

@Injectable()
export class UserRepositoryImpl implements UserRepository {
  readonly #shouldFetch = signal(false);
  readonly #logged = httpResource(() => (this.#shouldFetch() ? 'users/me' : undefined), {
    parse: mapUserToEntity,
  });

  public readonly logged = this.#logged.asReadonly();

  public setShouldFetchLogged(value: boolean) {
    this.#shouldFetch.set(value);
  }
}
