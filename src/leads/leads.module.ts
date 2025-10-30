import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { Lead } from './entity/lead.entity';
import { OffersModule } from 'src/offers/offers.module';
import { Offer } from 'src/offers/entity/offer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Lead, Offer]), 
  ],
  controllers: [LeadsController],
  providers: [LeadsService, OffersModule],
  exports: [LeadsService],
})
export class LeadsModule { }
