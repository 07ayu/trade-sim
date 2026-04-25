import { OrdersService } from './orders.service';
import { Body, Controller, Post, Get, UseGuards, Req } from '@nestjs/common';
import { OrderCreatedDto } from './dto/order-created.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('orders')
@UseGuards(AuthGuard('jwt'))
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('')
  async create(@Body() body: OrderCreatedDto, @Req() req: any) {
    console.log('got order got posted');
    const userId = req.user.userId;
    console.log(userId, body);
    await this.ordersService.createOrder(userId, body);
    console.log(body);
    return { message: 'order event Published' };
  }

  @Get('')
  async getOrders(@Req() req: any) {
    console.log('get Order Req Received');
    const userId = req.user.userId;
    const orders = await this.ordersService.getOrder(userId);
    console.log(orders);
    return { orders };
  }
}
