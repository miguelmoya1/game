import { TestBed } from '@angular/core/testing';

import { SetServiceImpl } from './set.service';

describe('SetServiceImpl', () => {
  let service: SetServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
