import { computed, inject, ResourceStatus } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AUTH_SERVICE } from '../services/auth.service.contract';

export const notLoggedGuard: CanMatchFn = () => {
  const authService = inject(AUTH_SERVICE);
  const router = inject(Router);

  const isAuthenticated = computed(() => ({
    value: authService.isAuthenticated.value(),
    status: authService.isAuthenticated.status(),
  }));

  return toObservable(isAuthenticated).pipe(
    filter((value) => value.status !== ResourceStatus.Loading),
    tap((res) => {
      if (res.value) {
        router.navigate(['/map']);
      }
    }),
    map(() => true),
  );
};
