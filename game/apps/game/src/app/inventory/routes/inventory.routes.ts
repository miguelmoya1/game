import { Routes } from '@angular/router';

const INVENTORY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../pages/inventory.component').then((m) => m.InventoryComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default INVENTORY_ROUTES;
