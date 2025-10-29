import { Controller, Post, Body, Get } from '@nestjs/common';
import { OffersService } from './offers.service';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Offers')
@Controller('offer')
export class OffersController {
  constructor(private readonly offersService: OffersService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a new offer',
    description: 'Creates a new offer with name, value propositions, and ideal use cases.',
  })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'AI Outreach Automation' },
        value_props: {
          type: 'array',
          items: { type: 'string' },
          example: ['24/7 outreach', '6x more meetings'],
        },
        ideal_use_cases: {
          type: 'array',
          items: { type: 'string' },
          example: ['B2B SaaS mid-market'],
        },
      },
      required: ['name', 'value_props', 'ideal_use_cases'],
    },
  })
  @ApiResponse({ status: 201, description: 'Offer created successfully.' })
  @ApiResponse({ status: 400, description: 'Invalid request body.' })
  async createOffer(@Body() body: any) {
    return this.offersService.createOffer(body);
  }

  @Get()
  @ApiOperation({
    summary: 'Get all offers',
    description: 'Returns a list of all available offers in the system.',
  })
  @ApiResponse({
    status: 200,
    description: 'List of offers retrieved successfully.',
    schema: {
      type: 'array',
      items: {
        properties: {
          id: { type: 'string', example: 'f3a2c0f1-b9b2-4a6b-9b11-7e2d2b3a1e2c' },
          name: { type: 'string', example: 'AI Outreach Automation' },
          value_props: {
            type: 'array',
            items: { type: 'string' },
            example: ['24/7 outreach', '6x more meetings'],
          },
          ideal_use_cases: {
            type: 'array',
            items: { type: 'string' },
            example: ['B2B SaaS mid-market'],
          },
          createdAt: { type: 'string', example: '2025-10-29T12:34:56.000Z' },
        },
      },
    },
  })
  async getAll() {
    return this.offersService.getAllOffers();
  }
}
