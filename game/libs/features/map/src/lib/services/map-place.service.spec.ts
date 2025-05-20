import { TestBed } from '@angular/core/testing';

import { MapPlaceService } from './map-place.service';

describe('MapPlaceService', () => {
  let service: MapPlaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPlaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
