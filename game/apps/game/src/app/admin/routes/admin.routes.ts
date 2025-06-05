import { Routes } from '@angular/router';

const ADMIN_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../admin.component'),
  },
  {
    path: 'item/new',
    loadComponent: () => import('../pages/item-new.component'),
  },
  {
    path: 'item/:itemId/edit',
    loadComponent: () => import('../pages/item-edit.component'),
  },
  {
    path: 'set/new',
    loadComponent: () => import('../pages/set-new.component'),
  },
  {
    path: 'set/:setId/edit',
    loadComponent: () => import('../pages/set-edit.component'),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default ADMIN_ROUTES;
