import { Routes } from '@angular/router';

const PARTY_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () => import('../pages/party-page.component').then((m) => m.PartyPageComponent),
  },
];

export default PARTY_ROUTES;
