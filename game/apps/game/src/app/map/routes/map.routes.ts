import { Routes } from '@angular/router';

const MAP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../map.component'),
    children: [
      {
        path: ':placeId',
        loadComponent: () => import('../pages/place-detail.component'),
      },
    ],
  },

  {
    path: '*',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default MAP_ROUTES;
