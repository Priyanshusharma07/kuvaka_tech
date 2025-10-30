import { Test, TestingModule } from '@nestjs/testing';
import { LeadsService } from './leads.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Lead } from './entity/lead.entity';
import { Offer } from '../offers/entity/offer.entity';
import { Repository } from 'typeorm';

jest.mock('node-fetch', () => jest.fn());
import fetch from 'node-fetch';
import { Response } from 'node-fetch';

describe('LeadsService', () => {
  let service: LeadsService;
  let leadRepo: Repository<Lead>;
  let offerRepo: Repository<Offer>;
  const mockedFetch = fetch as unknown as jest.MockedFunction<typeof fetch>;

  beforeEach(async () => {
    process.env.OPENROUTER_API_KEY = 'sk-test123';
    jest.spyOn(console, 'error').mockImplementation(() => { }); // silence console errors

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeadsService,
        {
          provide: getRepositoryToken(Lead),
          useValue: {
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Offer),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<LeadsService>(LeadsService);
    leadRepo = module.get(getRepositoryToken(Lead));
    offerRepo = module.get(getRepositoryToken(Offer));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // it('should handle AI intent mock correctly', async () => {
  //   mockedFetch.mockResolvedValueOnce(
  //     new Response(
  //       JSON.stringify({
  //         choices: [
  //           { message: { content: `{"intent":"High","reasoning":"Strong match"}` } },
  //         ],
  //       })
  //     )
  //   );

  //   const lead = {
  //     name: 'John',
  //     role: 'CEO',
  //     company: 'Tech Inc',
  //     industry: 'SaaS',
  //     location: 'NY',
  //     linkedin_bio: 'Experienced founder',
  //   } as Lead;

  //   const offer = {
  //     name: 'Growth Offer',
  //     value_props: ['SaaS'],
  //     ideal_use_cases: ['Tech'],
  //   } as Offer;

  //   const result = await (service as any).getAIIntent(lead, offer);
  //   expect(result.intent).toBe('High');
  // });

  it('should handle network failure in getAIIntent gracefully', async () => {
    mockedFetch.mockRejectedValueOnce(new Error('Network error'));

    const result = await (service as any).getAIIntent({} as Lead, {} as Offer);
    expect(result.intent).toBe('Medium');
    expect(result.reasoning).toContain('AI error');
  });

  it('should export leads to CSV successfully', async () => {
    const leads = [{ id: 1, name: 'Test Lead', role: 'Manager', scored: true }] as Lead[];
    (leadRepo.find as jest.Mock).mockResolvedValue(leads);

    const res: any = {
      setHeader: jest.fn(),
      status: jest.fn().mockReturnThis(),
      end: jest.fn(),
    };

    await service.exportLeadsToCSV(res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.end).toHaveBeenCalled();
  });

  it('should handle exportLeadsToCSV DB error gracefully', async () => {
    (leadRepo.find as jest.Mock).mockRejectedValue(new Error('DB error'));
    await expect(service.exportLeadsToCSV({} as any)).rejects.toThrow();
  });
});
