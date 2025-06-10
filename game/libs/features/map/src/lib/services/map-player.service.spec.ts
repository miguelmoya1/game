import { TestBed } from '@angular/core/testing';

import { MapPlayerServiceImpl } from './map-player.service';

describe('MapPlayerServiceImpl', () => {
  let service: MapPlayerServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPlayerServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
