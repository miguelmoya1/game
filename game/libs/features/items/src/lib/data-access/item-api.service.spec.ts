import { TestBed } from '@angular/core/testing';

import { ItemApiServiceImpl } from './item-api.service';

describe('ItemApiServiceImpl', () => {
  let service: ItemApiServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemApiServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
