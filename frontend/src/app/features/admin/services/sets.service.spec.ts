import { TestBed } from '@angular/core/testing';

import { SetsServiceImpl } from './sets.service';

describe('SetsServiceImpl', () => {
  let service: SetsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
