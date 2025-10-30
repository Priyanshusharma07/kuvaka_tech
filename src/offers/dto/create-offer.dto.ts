import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CreateOfferDto {
  @ApiProperty({ example: 'AI Outreach Automation' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: ['24/7 outreach', '6x more meetings'] })
  @IsArray()
  value_props: string[];

  @ApiProperty({ example: ['B2B SaaS mid-market'] })
  @IsArray()
  ideal_use_cases: string[];
}
