import { OrderCreatedEvent } from 'src/events/order-created.event';
import { type orderBookSide } from '../matching.service';

export class Match {
  matchBuy(
    order: OrderCreatedEvent,
    book: { bids: orderBookSide; asks: orderBookSide },
  ) {
    const sortedAsk = book.asks.sort((a, b) => a.price - b.price);

    for (const ask of sortedAsk) {
      if (ask.price > order.price) break;

      const fillQuantity = Math.min(
        order.remainingQuantity,
        ask.remainingQuantity,
      );

      order.remainingQuantity -= fillQuantity;
      ask.remainingQuantity -= fillQuantity;

      // publishfill

      if (ask.remainingQuantity === 0) {
        ask.status = 'FILLED';
        book.asks = book.asks.filter((a) => a !== ask);
      } else {
        ask.status = 'PARTIALLY_FILLED';
      }

      if (order.remainingQuantity === 0) {
        order.status = 'FILLED';
        return;
      }
    }

    if (order.remainingQuantity > 0) {
      order.status =
        order.quantity > order.remainingQuantity
          ? 'PARTIALLY_FILLED'
          : 'FILLED';
    }
    book.bids.push(order);

    return { filed: false };
  }

  matchSell(
    order: OrderCreatedEvent,
    book: { bids: orderBookSide; asks: orderBookSide },
  ) {
    const bestBid = book.asks.sort((a, b) => b.price - a.price)[0];

    if (bestBid && bestBid.price >= order.price) {
      book.bids = book.bids.filter((a) => a !== bestBid);
      return { filled: true, counterparty: bestBid };
    }
    book.asks.push(order);
    return { filled: false };
  }
}
