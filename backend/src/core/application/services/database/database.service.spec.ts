import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseServiceImpl } from './database.service';

describe('DatabaseServiceImpl', () => {
  let service: DatabaseServiceImpl;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatabaseServiceImpl],
    }).compile();

    service = module.get<DatabaseServiceImpl>(DatabaseServiceImpl);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
