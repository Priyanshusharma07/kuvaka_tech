import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { isEmpty } from 'rxjs';

@Entity('offers')
export class Offer {
  @ApiProperty({ example: 'c8e2a0a3-1e3a-4c22-9a8e-5c9f5c998a3a' })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ example: 'AI Outreach Automation', description: 'Name of the product or offer' })
  @Column({nullable: true})
  name: string;

  @ApiProperty({
    example: ['24/7 outreach', '6x more meetings'],
    description: 'Value propositions highlighting offer strengths',
  })
  @Column('text', { array: true, nullable: true })
  value_props: string[];

  @ApiProperty({
    example: ['B2B SaaS mid-market'],
    description: 'Ideal use cases or target audience for the offer',
  })
  @Column('text', { array: true, nullable: true })
  ideal_use_cases: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
