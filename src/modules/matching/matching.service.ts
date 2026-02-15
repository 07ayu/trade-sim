import { PriceController } from './../price/price.controller';
import { RedisPublisher } from 'src/infrastructure/redis/redis.publisher';
import { Match } from './match/matching.engine';
import { Injectable } from '@nestjs/common';
import { OrderCreatedEvent } from 'src/events/order-created.event';

export type orderBookSide = OrderCreatedEvent[];

@Injectable()
export class MatchingService {
  private orderBook: Map<
    string,
    {
      bids: orderBookSide;
      asks: orderBookSide;
    }
  > = new Map();
  constructor(
    private match: Match,
    private redisPublisher: RedisPublisher,
  ) {}

  addOrder(order: OrderCreatedEvent) {
    const { symbol, side } = order;

    if (!this.orderBook.has(symbol)) {
      this.orderBook.set(symbol, { bids: [], asks: [] });
    }
    const book = this.orderBook.get(symbol)!;

    if (side === 'SELL') {
      return this.match.matchBuy(order, book);
    } else {
      return this.match.matchSell(order, book);
    }
  }
  private asyncpublishFill(buyOrder, sellOrder, quantity, price) {
    await this.redisPublisher.publish('order_filled', {
      buyerUserId: this.buyORder,
    });
  }
}
