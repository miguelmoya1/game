import { Routes } from '@angular/router';
import { MapCoreService } from '../services/map-core.service';
import { MapPlaceService } from '../services/map-place.service';
import { MapPlayerService } from '../services/map-player.service';
import { PlaceServiceImpl } from '../services/place.service';
import { PLACE_SERVICE } from '../services/place.service.contract';

const MAP_ROUTES: Routes = [
  {
    path: '',
    providers: [
      {
        provide: PLACE_SERVICE,
        useClass: PlaceServiceImpl,
      },
      MapCoreService,
      MapPlaceService,
      MapPlayerService,
    ],
    loadComponent: () => import('../pages/map.component').then((m) => m.MapComponent),
    children: [
      {
        path: ':placeId',
        loadComponent: () => import('../pages/place-detail.component').then((m) => m.PlaceDetailComponent),
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
];

export default MAP_ROUTES;
