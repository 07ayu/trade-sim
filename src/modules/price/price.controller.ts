import { RedisPublisher } from './../../infrastructure/redis/redis.publisher';
import { RedisService } from './../../infrastructure/redis/redis.service';
import { PriceService } from './price.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('price')
export class PriceController {
  constructor(
    private priceService: PriceService,
    private redisPublisher: RedisPublisher,
  ) {}

  @Get(':symbol')
  getPrice(@Param('symbol') symbol: string) {
    return this.priceService.getPrice(symbol);
  }
  @Get('')
  getAllPrice() {
    return this.priceService.getAllPrice();
  }

  @Post('')
  async updatePrice(@Body() body: { symbol: string; price: number }) {
    await this.redisPublisher.publish('price_update', body);
    return { message: 'price updated' };
  }
}
