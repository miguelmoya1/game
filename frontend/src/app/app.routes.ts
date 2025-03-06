import { Routes } from '@angular/router';
// import { loggedGuard, notLoggedGuard } from '@game/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    providers: [],
    loadChildren: () => import('./presentation/pages/game/router/game.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
