import { OrdersService } from './orders.service';
import { Body, Controller, Post } from '@nestjs/common';
import { OrderCreatedDto } from './dto/order-created.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('')
  async create(@Body() body: OrderCreatedDto) {
    console.log('got order got posted');
    await this.ordersService.createOrder(body);
    return { message: 'order event Published' };
  }
}
