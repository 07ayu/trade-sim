import { OrdersService } from './orders.service';
import { Body, Controller, Post } from '@nestjs/common';
import type { OrderCreatedEvent } from 'src/events/order-created.event';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('')
  async create(@Body() body: OrderCreatedEvent) {
    await this.ordersService.createOrder(body);
    return { message: 'order event Published' };
  }
}
