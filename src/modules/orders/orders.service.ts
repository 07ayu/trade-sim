import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderPublisher } from './order.publisher';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrdersService {
  constructor(private orderPublisher: OrderPublisher) {}

  async createOrder(event: OrderCreatedEvent) {
    await this.orderPublisher.OrderCreated(event);
  }
}
