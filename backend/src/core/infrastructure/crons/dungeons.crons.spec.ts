import { Test, TestingModule } from '@nestjs/testing';
import { DungeonsCrons } from './dungeons.crons';
import { CommandBus } from '@nestjs/cqrs';

describe('DungeonsCrons', () => {
  let service: DungeonsCrons;
  let commandBus: CommandBus;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DungeonsCrons,
        {
          provide: CommandBus,
          useValue: { execute: jest.fn() },
        },
      ],
    }).compile();

    service = module.get<DungeonsCrons>(DungeonsCrons);
    commandBus = module.get<CommandBus>(CommandBus);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call commandBus.execute on handleDailyDungeonGeneration', async () => {
    await service.handleDailyDungeonGeneration();
    expect(commandBus.execute).toHaveBeenCalled();
  });
});
