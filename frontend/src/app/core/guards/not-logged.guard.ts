import { computed, inject, ResourceStatus } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { CanMatchFn, Router } from '@angular/router';
import { AuthService } from '@game/core/services/auth.service';
import { filter, map, tap } from 'rxjs';

export const notLoggedGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isAuthenticated = computed(() => ({
    value: authService.isAuthenticated.value(),
    status: authService.isAuthenticated.status(),
  }));

  return toObservable(isAuthenticated).pipe(
    filter((value) => value.status !== ResourceStatus.Idle && value.status !== ResourceStatus.Loading),
    tap((res) => {
      if (res.value) {
        router.navigate(['/map']);
      }
    }),
    map(() => true),
  );
};
