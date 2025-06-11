import { TestBed } from '@angular/core/testing';

import { MapPointsServiceImpl } from './map-points.service';

describe('MapPointsServiceImpl', () => {
  let service: MapPointsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapPointsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
