import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Lead } from './leads/entity/lead.entity';
import { OffersModule } from './offers/offers.module';
import { LeadsModule } from './leads/leads.module';
import { ScoringService } from './scoring/scoring.service';
import { Offer } from './offers/entity/offer.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'aws-1-ap-south-1.pooler.supabase.com',
      port: 6543,
      username: 'postgres.lfwnlbdxawasnkxyiubk',
      password: 'Sharma@1234',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }), OffersModule, LeadsModule

  ],
  providers: [ScoringService],
})
export class AppModule { }
