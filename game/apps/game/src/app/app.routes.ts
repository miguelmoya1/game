import { Route } from '@angular/router';
import { loggedGuard, notLoggedGuard } from '@game/features/auth';

export const appRoutes: Route[] = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    canMatch: [notLoggedGuard],
    loadChildren: () => import('./auth/routes/auth.routes'),
  },
  {
    path: 'map',
    canMatch: [loggedGuard],
    loadChildren: () => import('./map/routes/map.routes'),
  },
  {
    path: 'inventory',
    canMatch: [loggedGuard],
    loadChildren: () =>
      import('@game/features/inventory').then((m) => m.inventoryRoutes),
  },
  // {
  //   path: 'admin',
  //   canMatch: [loggedGuard],
  //   loadChildren: () =>
  //     import('@game/features/admin').then((m) => m.adminRoutes),
  // },
  {
    path: 'player',
    canMatch: [loggedGuard],
    loadChildren: () => import('./player/routes/player.routes'),
  },
  // {
  //   path: 'party',
  //   canMatch: [loggedGuard],
  //   loadChildren: () =>
  //     import('@game/features/party').then((m) => m.partyRoutes),
  // },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
