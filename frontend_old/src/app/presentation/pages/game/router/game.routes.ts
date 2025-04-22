import { Routes } from '@angular/router';
import { placeRepositoryProvider } from '@game/di/repositories';
import { placeUseCaseProvider } from '@game/di/use-cases';

const gameRoutes: Routes = [
  {
    path: '',
    providers: [placeRepositoryProvider, placeUseCaseProvider],
    loadComponent: () => import('../game.component').then((m) => m.GameComponent),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default gameRoutes;
