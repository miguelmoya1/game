import { Routes } from '@angular/router';
import { AuthApiServiceImpl } from '../data-access/auth-api.service';
import { AUTH_API_SERVICE } from '../data-access/auth-api.service.contract';
import { AuthServiceImpl } from '../services/auth.service';
import { AUTH_SERVICE } from '../services/auth.service.contract';

const authRoutes: Routes = [
  {
    path: '',
    providers: [
      {
        provide: AUTH_API_SERVICE,
        useClass: AuthApiServiceImpl,
      },
      {
        provide: AUTH_SERVICE,
        useClass: AuthServiceImpl,
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
