import { TestBed } from '@angular/core/testing';

import { MapPlaceServiceImpl } from './map-place.service';

describe('MapPlaceServiceImpl', () => {
  let service: MapPlaceServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPlaceServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
