import { Routes } from '@angular/router';

const PLAYER_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../player.component').then((m) => m.PlayerComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default PLAYER_ROUTES;
