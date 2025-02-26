import { Routes } from '@angular/router';

const gameRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('../game.component').then((m) => m.GameComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default gameRoutes;
