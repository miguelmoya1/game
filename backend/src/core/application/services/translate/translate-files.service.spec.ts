import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { TranslateExtractorService } from './translate-extractor.service';
import { TranslateFilesService } from './translate-files.service';

jest.mock('@nestjs/config');
jest.mock('./translate-extractor.service');

describe('TranslateFilesService', () => {
  let service: TranslateFilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateFilesService, ConfigService, TranslateExtractorService],
    }).compile();

    service = module.get<TranslateFilesService>(TranslateFilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
