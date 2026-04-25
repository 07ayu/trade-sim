import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderBook } from '../interface/orderbook.interface';
import { TradeInterface } from '../interface/trade.interface';

export class Match {
  matchBuy(
    order: OrderCreatedEvent,
    book: OrderBook,
    trades: TradeInterface[],
  ): OrderCreatedEvent[] {
    const sortedAsk = book.asks;
    const affectedOrders: OrderCreatedEvent[] = [];

    for (const ask of sortedAsk) {
      if (ask.price > order.price) break;

      const fillQuantity = Math.min(
        order.remainingQuantity,
        ask.remainingQuantity,
      );

      order.remainingQuantity -= fillQuantity;
      ask.remainingQuantity -= fillQuantity;
      console.log('trade executed');

      trades.push({
        symbol: order.symbol,
        buyerUserId: order.userId,
        sellerUserId: ask.userId,
        buyOrderId: order._id as string,
        sellOrderId: ask._id as string,
        buyRemainingQuantity: order.remainingQuantity,
        sellRemainingQuantity: ask.remainingQuantity,
        quantity: fillQuantity,
        price: ask.price,
        timestamp: Date.now(),
      });

      if (ask.remainingQuantity === 0) {
        ask.status = 'FILLED';
        book.asks = book.asks.filter((a) => a !== ask);
      } else {
        ask.status = 'PARTIALLY_FILLED';
      }

      affectedOrders.push(ask);
      if (order.remainingQuantity === 0) break;
    }
    return affectedOrders;
  }

  matchSell(
    order: OrderCreatedEvent,
    book: OrderBook,
    trades: TradeInterface[],
  ): OrderCreatedEvent[] {
    const sortedBids = book.bids;
    const affectedOrders: OrderCreatedEvent[] = [];

    for (const bid of sortedBids) {
      if (bid.price < order.price) break;

      const fillQuantity = Math.min(
        order.remainingQuantity,
        bid.remainingQuantity,
      );

      order.remainingQuantity -= fillQuantity;
      bid.remainingQuantity -= fillQuantity;

      trades.push({
        symbol: order.symbol,
        buyerUserId: bid.userId,
        sellerUserId: order.userId,
        buyOrderId: bid._id as string,
        sellOrderId: order._id as string,
        buyRemainingQuantity: bid.remainingQuantity,
        sellRemainingQuantity: order.remainingQuantity,
        quantity: fillQuantity,
        price: bid.price,
        timestamp: Date.now(),
      });

      if (bid.remainingQuantity === 0) {
        bid.status = 'FILLED';
        book.bids = book.bids.filter((a) => a !== bid);
      } else {
        bid.status = 'PARTIALLY_FILLED';
      }

      affectedOrders.push(bid);
      if (order.remainingQuantity === 0) break;
    }
    return affectedOrders;
  }
}
