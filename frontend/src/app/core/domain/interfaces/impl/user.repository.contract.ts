import { InjectionToken, Resource } from '@angular/core';
import { User } from '@game/entities';

export interface UserRepository {
  readonly logged: Resource<User | undefined>;

  setShouldFetchLogged(value: boolean): void;
}

export const USER_REPOSITORY = new InjectionToken<UserRepository>('USER_REPOSITORY');
