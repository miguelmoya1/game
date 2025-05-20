import { TestBed } from '@angular/core/testing';

import { AuthGlobalService } from './auth-global.service';

describe('AuthGlobalService', () => {
  let service: AuthGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
