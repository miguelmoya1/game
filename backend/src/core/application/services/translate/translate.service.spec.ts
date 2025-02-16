import { Test, TestingModule } from '@nestjs/testing';
import { TranslateFilesService } from './translate-files.service';
import { TranslateService } from './translate.service';

jest.mock('./translate-files.service');

describe('TranslateService', () => {
  let service: TranslateService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TranslateService, TranslateFilesService],
    }).compile();

    service = module.get(TranslateService);

    await service.onModuleInit();
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });
});
