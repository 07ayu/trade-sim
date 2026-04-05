import { Order, OrderDocument } from './order.schema';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderPublisher } from './order.publisher';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class OrdersService {
  constructor(
    private orderPublisher: OrderPublisher,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(event: OrderCreatedEvent) {
    // await this.orderModel.create(event);
    await this.orderPublisher.OrderCreated(event);
  }
}
