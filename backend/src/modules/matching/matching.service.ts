import { Order, OrderDocument } from 'src/modules/orders/models/order.schema';
import { TradeInterface } from './interface/trade.interface';
import { RedisPublisher } from 'src/infrastructure/redis/redis.publisher';
import { Match } from './match/matching.engine';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderBook } from './interface/orderbook.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class MatchingService implements OnModuleInit {
  private orderBook: Map<string, OrderBook> = new Map();
  constructor(
    private match: Match,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async onModuleInit() {
    await this.rebuildOrderBook();
  }

  private getOrderBook(symbol: string): OrderBook {
    if (!this.orderBook.has(symbol)) {
      this.orderBook.set(symbol, { bids: [], asks: [] });
    }
    return this.orderBook.get(symbol)!;
  }

  addOrder(order: OrderCreatedEvent): {
    trades: TradeInterface[];
    remainingOrder?: OrderCreatedEvent;
  } {
    const book = this.getOrderBook(order.symbol);
    const trades: TradeInterface[] = [];
    if (order.side === 'BUY') {
      this.match.matchBuy(order, book, trades);
    } else {
      this.match.matchSell(order, book, trades);
    }

    if (order.remainingQuantity > 0) {
      order.status =
        order.quantity > order.remainingQuantity
          ? 'PARTIALLY_FILLED'
          : 'PENDING';

      if (order.side === 'SELL') {
        book.asks.push(order);
      } else {
        book.bids.push(order);
      }
      return { trades, remainingOrder: order };
    }
    order.status = 'FILLED';
    return { trades };
  }

  async rebuildOrderBook() {
    const pendingOrders = await this.orderModel
      .find({
        status: { $in: ['PENDING', 'PARTIALLY_FILLED'] },
      })
      .lean();

    for (const order of pendingOrders) {
      const internalOrder: OrderCreatedEvent = {
        userId: order.userId.toString(),
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        remainingQuantity: order.remainingQuantity,
        status: order.status,
        price: order.price,
        createdAt: order.createdAt,
      };

      this.addToOrderbook(internalOrder);
      console.log('orderbook rehyderated');
    }
  }
  private addToOrderbook(order: OrderCreatedEvent) {
    const book = this.getOrderBook(order.symbol);

    if (order.side === 'BUY') {
      book.bids.push(order);
      book.bids.sort((a, b) => {
        if (b.price !== a.price) {
          return b.price - a.price;
        }
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    } else {
      book.asks.push(order);
      book.asks.sort((a, b) => {
        if (a.price !== b.price) {
          return a.price - b.price;
        }
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    }
  }

getAggregatedOrderBook(symbol: string) {
  const book = this.getOrderBook(symbol);

  const aggregate = (side: OrderCreatedEvent[], isBid: boolean) => {
    const depthMap = new Map<number, { price: number; quantity: number }>();
    side.forEach((o) => {
      const existing = depthMap.get(o.price);
      if (existing) {
        existing.quantity += o.quantity;
      } else {
        depthMap.set(o.price, { price: o.price, quantity: o.quantity });
      }
    });

    const levels = Array.from(depthMap.values());
    if (isBid) {
      return levels.sort((a, b) => b.price - a.price).slice(0, 10);
    } else {
      return levels.sort((a, b) => a.price - b.price).slice(0, 10);
    }
  };

  return {
    bids: aggregate(book.bids, true),
    asks: aggregate(book.asks, false),
  };
}

  // private async publishFill(buyOrder, sellOrder, quantity, price) {
  //   await this.redisPublisher.publish('order_filled', {
  //     buyerUserId: buyOrder.,
  //   });
  // }
}
