import { Routes } from '@angular/router';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../admin.component'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default ADMIN_ROUTES;
