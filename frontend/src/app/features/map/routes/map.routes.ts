import { Routes } from '@angular/router';

const MAP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/map.component').then((m) => m.MapComponent),
    children: [
      {
        path: ':placeId',
        loadComponent: () => import('../pages/place-detail.component').then((m) => m.PlaceDetailComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default MAP_ROUTES;
