import { TestBed } from '@angular/core/testing';

import { DungeonApiService } from './dungeon-api.service';

describe('DungeonApiService', () => {
  let service: DungeonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DungeonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
