import { PriceSubscriber } from './pirce.subscriber';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PriceService {
  constructor(private priceSubscriber: PriceSubscriber) {}

  getPrice(symbol: string) {
    return this.priceSubscriber.getPrice(symbol);
  }

  getAllPrice() {
    return this.priceSubscriber.getAllPrice();
  }
}
