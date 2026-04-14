import { Controller, Get, Param } from '@nestjs/common';
import { MatchingService } from './matching.service';

@Controller('matching')
export class MatchingController {
  constructor(private readonly matchingService: MatchingService) {}

  @Get('orderbook/:symbol')
  getOrderbook(@Param('symbol') symbol: string) {
    return this.matchingService.getAggregatedOrderBook(symbol);
  }
}
