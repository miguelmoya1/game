import { Routes } from '@angular/router';
// import { loggedGuard, notLoggedGuard } from '@game/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
