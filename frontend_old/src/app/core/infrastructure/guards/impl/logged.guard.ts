import { computed, inject, ResourceStatus } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { AUTH_USE_CASE } from '@game/use-cases';
import { filter, map, tap } from 'rxjs';

export const loggedGuard: CanMatchFn = () => {
  const authUseCase = inject(AUTH_USE_CASE);
  const router = inject(Router);

  const isAuthenticated = computed(() => ({
    value: authUseCase.isAuthenticated.value(),
    status: authUseCase.isAuthenticated.status(),
  }));

  return toObservable(isAuthenticated).pipe(
    filter((value) => value.status !== ResourceStatus.Idle && value.status !== ResourceStatus.Loading),
    tap((logged) => {
      if (!logged.value) {
        router.navigate(['/auth/login']);
      }
    }),
    map(() => true),
  );
};
