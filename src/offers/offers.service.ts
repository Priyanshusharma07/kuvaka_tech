import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Offer } from './entity/offer.entity';

@Injectable()
export class OffersService {
  constructor(
    @InjectRepository(Offer)
    private offerRepo: Repository<Offer>,
  ) {}

  async createOffer(data: Partial<Offer>): Promise<Offer> {
    const offer = this.offerRepo.create(data);
    return await this.offerRepo.save(offer);
  }

  async getAllOffers(): Promise<Offer[]> {
    return this.offerRepo.find();
  }
}
