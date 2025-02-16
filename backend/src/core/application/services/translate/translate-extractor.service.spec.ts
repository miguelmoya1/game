import { Test, TestingModule } from '@nestjs/testing';
import { TranslateExtractorService } from './translate-extractor.service';

describe('TranslateExtractorService', () => {
  let service: TranslateExtractorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateExtractorService],
    }).compile();

    service = module.get<TranslateExtractorService>(TranslateExtractorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
