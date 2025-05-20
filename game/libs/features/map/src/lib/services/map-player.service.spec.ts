import { TestBed } from '@angular/core/testing';

import { MapPlayerService } from './map-player.service';

describe('MapPlayerService', () => {
  let service: MapPlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPlayerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
