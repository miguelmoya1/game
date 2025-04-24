import { Routes } from '@angular/router';

const MAP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/map.component').then((m) => m.MapComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default MAP_ROUTES;
