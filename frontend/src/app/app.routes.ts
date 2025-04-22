import { Routes } from '@angular/router';
import { notLoggedGuard } from '@game/core/guards/not-logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  // {
  //   path: 'game',
  //   canMatch: [loggedGuard],
  // loadChildren: () => import('./features/game/router/game.routes'),
  // },
  {
    path: 'auth',
    canMatch: [notLoggedGuard],
    loadChildren: () => import('./features/auth/routes/auth.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
