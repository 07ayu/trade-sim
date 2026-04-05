import { OrderCreatedEvent } from 'src/events/order-created.event';

export interface OrderBookSide extends Array<OrderCreatedEvent> {}

export interface OrderBook {
  bids: OrderBookSide;
  asks: OrderBookSide;
}
