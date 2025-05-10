import { TestBed } from '@angular/core/testing';

import { SetApiServiceImpl } from './set-api.service';

describe('SetApiServiceImpl', () => {
  let service: SetApiServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SetApiServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
