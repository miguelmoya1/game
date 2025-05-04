import { Routes } from '@angular/router';
import { notLoggedGuard } from '@game/core/guards/not-logged.guard';
import { loggedGuard } from './core/guards/logged.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'map',
    canMatch: [loggedGuard],
    loadChildren: () => import('./features/map/routes/map.routes'),
  },
  {
    path: 'auth',
    canMatch: [notLoggedGuard],
    loadChildren: () => import('./features/auth/routes/auth.routes'),
  },
  {
    path: 'inventory',
    canMatch: [loggedGuard],
    loadChildren: () => import('./features/inventory/routes/inventory.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
