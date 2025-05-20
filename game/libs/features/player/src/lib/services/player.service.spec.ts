import { TestBed } from '@angular/core/testing';
import { PlayerServiceImpl } from './player.service';

describe('PlayerServiceImpl', () => {
  let service: PlayerServiceImpl;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlayerServiceImpl);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
