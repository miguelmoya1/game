import { Routes } from '@angular/router';
import { AuthApiService } from '../data-access/auth-api.service';
import { AUTH_API_SERVICE } from '../data-access/auth-api.service.contract';
import { AuthFacade } from '../services/auth.facade';
import { AUTH_FACADE } from '../services/auth.facade.contract';

const authRoutes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: AUTH_API_SERVICE,
        useClass: AuthApiService,
      },
      {
        provide: AUTH_FACADE,
        useClass: AuthFacade,
      },
    ],
    loadComponent: () => import('../pages/auth-layout/auth-layout.component').then((m) => m.AuthLayoutComponent),
    children: [
      {
        path: 'login',
        loadComponent: () => import('../components/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        loadComponent: () => import('../components/register/register.component').then((m) => m.RegisterComponent),
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default authRoutes;
