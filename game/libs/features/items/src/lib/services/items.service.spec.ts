import { TestBed } from '@angular/core/testing';

import { ItemsServiceImpl } from './items.service';

describe('ItemsServiceImpl', () => {
  let service: ItemsServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemsServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
