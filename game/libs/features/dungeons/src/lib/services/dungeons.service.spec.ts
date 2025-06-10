import { TestBed } from '@angular/core/testing';
import { DungeonsServiceImpl } from './dungeons.service';

describe('DungeonsServiceImpl', () => {
  let service: DungeonsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
