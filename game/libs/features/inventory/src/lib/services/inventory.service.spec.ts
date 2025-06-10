import { TestBed } from '@angular/core/testing';

import { InventoryServiceImpl } from './inventory.service';

describe('InventoryServiceImpl', () => {
  let service: InventoryServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
