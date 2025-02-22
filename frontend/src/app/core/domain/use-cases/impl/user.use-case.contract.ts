import { InjectionToken, Resource } from '@angular/core';
import { User } from '@game/entities';

export interface UserUseCase {
  readonly userLogged: Resource<User | undefined>;
}

export const USER_USE_CASE = new InjectionToken<UserUseCase>('USER_USE_CASE');
