import { TestBed } from '@angular/core/testing';

import { PlaceServiceImpl } from './place.service';

describe('PlaceServiceImpl', () => {
  let service: PlaceServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlaceServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
