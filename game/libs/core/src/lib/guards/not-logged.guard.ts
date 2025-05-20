import { computed, inject, ResourceStatus } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthGlobalService } from '../services/auth-global.service';

export const notLoggedGuard: CanMatchFn = () => {
  const authService = inject(AuthGlobalService);
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
    map(() => true)
  );
};
