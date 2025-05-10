import { Routes } from '@angular/router';
import { SetApiServiceImpl } from '../data-access/set-api.service';
import { SET_API_SERVICE } from '../data-access/set-api.service.contract';
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
    ],
    children: [
      {
        path: '',
        loadComponent: () => import('../pages/admin.component').then((m) => m.AdminComponent),
      },
      {
        path: 'sets/new',
        loadComponent: () => import('../pages/create-set/create-set.component').then((m) => m.CreateSetComponent),
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
