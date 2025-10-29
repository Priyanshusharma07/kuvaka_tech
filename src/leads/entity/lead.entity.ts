import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('leads')
export class Lead {
  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Ava Patel' })
  @Column()
  name: string;

  @ApiProperty({ example: 'Head of Growth' })
  @Column()
  role: string;

  @ApiProperty({ example: 'FlowMetrics' })
  @Column()
  company: string;

  @ApiProperty({ example: 'SaaS' })
  @Column()
  industry: string;

  @ApiProperty({ example: 'Bangalore, India' })
  @Column()
  location: string;

  @ApiProperty({ example: 'Experienced growth leader in SaaS industry.' })
  @Column({ type: 'text', nullable: true })
  linkedin_bio: string;

  // scoring fields
  @ApiProperty({ example: 'High', required: false })
  @Column({ nullable: true })
  intent: string;

  @ApiProperty({ example: 85, required: false })
  @Column({ type: 'int', nullable: true })
  score: number;

  @ApiProperty({ example: 'Fits ICP SaaS mid-market and role is decision maker.', required: false })
  @Column({ type: 'text', nullable: true })
  reasoning: string;

  @ApiProperty({ example: true })
  @Column({ default: false })
  scored: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
