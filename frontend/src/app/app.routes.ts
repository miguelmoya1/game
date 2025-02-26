import { Routes } from '@angular/router';
import { gameUseCaseProvider } from './di/use-cases/impl/game.use-case.provider';
// import { loggedGuard, notLoggedGuard } from '@game/guards';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'game',
    pathMatch: 'full',
  },
  {
    path: 'game',
    providers: [gameUseCaseProvider],
    loadChildren: () => import('./presentation/pages/game/router/game.routes'),
  },
  {
    path: '**',
    redirectTo: 'auth/login',
  },
];
