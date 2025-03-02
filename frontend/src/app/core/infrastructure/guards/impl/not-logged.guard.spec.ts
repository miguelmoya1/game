import { TestBed } from '@angular/core/testing';
import { CanMatchFn } from '@angular/router';

import { notLoggedGuard } from './not-logged.guard';

describe('notLoggedGuard', () => {
  const executeGuard: CanMatchFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => notLoggedGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
