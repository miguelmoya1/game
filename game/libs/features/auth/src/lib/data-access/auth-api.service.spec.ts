import { TestBed } from '@angular/core/testing';

import { AuthApiServiceImpl } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
