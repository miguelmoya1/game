import { Route } from '@angular/router';
import { loggedGuard, notLoggedGuard } from '@game/core';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'map',
    canMatch: [loggedGuard],
    loadChildren: () => import('@game/features/map').then((m) => m.mapRoutes),
  },
  {
    path: 'auth',
    canMatch: [notLoggedGuard],
    loadChildren: () => import('@game/features/auth').then((m) => m.authRoutes),
  },
  {
    path: 'inventory',
    canMatch: [loggedGuard],
    loadChildren: () =>
      import('@game/features/inventory').then((m) => m.inventoryRoutes),
  },
  {
    path: 'admin',
    canMatch: [loggedGuard],
    loadChildren: () =>
      import('@game/features/admin').then((m) => m.adminRoutes),
  },
  {
    path: 'player',
    canMatch: [loggedGuard],
    loadChildren: () =>
      import('@game/features/player').then((m) => m.playerRoutes),
  },
  {
    path: 'party',
    canMatch: [loggedGuard],
    loadChildren: () =>
      import('@game/features/party').then((m) => m.partyRoutes),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
