import { Routes } from '@angular/router';
import { ItemApiServiceImpl } from '../data-access/item-api.service';
import { ITEM_API_SERVICE } from '../data-access/item-api.service.contract';
import { SetApiServiceImpl } from '../data-access/set-api.service';
import { SET_API_SERVICE } from '../data-access/set-api.service.contract';
import { ItemsServiceImpl } from '../services/items.service';
import { ITEMS_SERVICE } from '../services/items.service.contract';
import { SetsServiceImpl } from '../services/sets.service';
import { SETS_SERVICE } from '../services/sets.service.contract';

const adminRoutes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: SETS_SERVICE,
        useClass: SetsServiceImpl,
      },
      {
        provide: SET_API_SERVICE,
        useClass: SetApiServiceImpl,
      },
      {
        provide: ITEM_API_SERVICE,
        useClass: ItemApiServiceImpl,
      },
      {
        provide: ITEMS_SERVICE,
        useClass: ItemsServiceImpl,
      },
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'sets/:setId/edit',
        loadComponent: () => import('../pages/edit-set/edit-set.component').then((m) => m.EditSetComponent),
      },
      {
        path: 'sets/new',
        loadComponent: () => import('../pages/create-set/create-set.component').then((m) => m.CreateSetComponent),
      },
      {
        path: 'items/:itemId/edit',
        loadComponent: () => import('../pages/edit-item/edit-item.component').then((m) => m.EditItemComponent),
      },
      {
        path: 'items/new',
        loadComponent: () => import('../pages/create-item/create-item.component').then((m) => m.CreateItemComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default adminRoutes;
