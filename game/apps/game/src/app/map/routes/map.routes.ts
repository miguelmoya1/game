import { Routes } from '@angular/router';

const MAP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../map.component'),
    children: [
      {
        path: ':placeId',
        loadComponent: () =>
          import('@game/features/places').then((m) => m.PlaceDetailComponent),
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
