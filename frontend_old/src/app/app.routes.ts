import { Routes } from '@angular/router';
import { loggedGuard, notLoggedGuard } from './core/infrastructure/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    canMatch: [loggedGuard],
    loadChildren: () => import('./presentation/pages/game/router/game.routes'),
  },
  {
    path: 'auth',
    canMatch: [notLoggedGuard],
    loadChildren: () => import('./presentation/pages/auth/router/auth.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
