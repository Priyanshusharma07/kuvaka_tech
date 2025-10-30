import { Test, TestingModule } from '@nestjs/testing';
import { LeadsController } from './leads.controller';
import { LeadsService } from './leads.service';

describe('LeadsController', () => {
  let controller: LeadsController;
  let service: LeadsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeadsController],
      providers: [
        {
          provide: LeadsService,
          useValue: {
            uploadLeads: jest.fn(),
            runScoringPipeline: jest.fn(),
            getResults: jest.fn(),
            exportLeadsToCSV: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<LeadsController>(LeadsController);
    service = module.get<LeadsService>(LeadsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
