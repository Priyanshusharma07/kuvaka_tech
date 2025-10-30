import { Test, TestingModule } from '@nestjs/testing';
import { OffersController } from './offers.controller';
import { OffersService } from './offers.service';

describe('OffersController', () => {
  let controller: OffersController;
  let offersService: OffersService;

  const mockOffersService = {
    createOffer: jest.fn().mockResolvedValue({
      id: '123',
      name: 'AI Outreach Automation',
      value_props: ['24/7 outreach', '6x more meetings'],
      ideal_use_cases: ['B2B SaaS mid-market'],
    }),
    getAllOffers: jest.fn().mockResolvedValue([
      {
        id: '123',
        name: 'AI Outreach Automation',
        value_props: ['24/7 outreach', '6x more meetings'],
        ideal_use_cases: ['B2B SaaS mid-market'],
      },
    ]),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OffersController],
      providers: [
        {
          provide: OffersService,
          useValue: mockOffersService,
        },
      ],
    }).compile();

    controller = module.get<OffersController>(OffersController);
    offersService = module.get<OffersService>(OffersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create an offer', async () => {
    const dto = {
      name: 'AI Outreach Automation',
      value_props: ['24/7 outreach', '6x more meetings'],
      ideal_use_cases: ['B2B SaaS mid-market'],
    };

    const result = await controller.createOffer(dto);
    expect(offersService.createOffer).toHaveBeenCalledWith(dto);
    expect(result).toHaveProperty('id');
  });

  it('should get all offers', async () => {
    const result = await controller.getAll();
    expect(offersService.getAllOffers).toHaveBeenCalled();
    expect(result.length).toBeGreaterThan(0);
  });
});
