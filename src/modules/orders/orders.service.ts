import { RiskService } from './../risk/risk.service';
import { Order, type OrderDocument } from './models/order.schema';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderPublisher } from './order.publisher';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderCreatedDto } from './dto/order-created.dto';

@Injectable()
export class OrdersService {
  constructor(
    private orderPublisher: OrderPublisher,
    private riskService: RiskService,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(dto: OrderCreatedDto) {
    const event: OrderCreatedEvent = {
      userId: dto.userId,
      symbol: dto.symbol,
      side: dto.side,
      quantity: dto.quantity,
      remainingQuantity: dto.quantity,
      price: dto.price,
      status: 'PENDING',
    };
    this.riskService.validateOrder(event);
    await this.orderModel.create(event);

    await this.orderPublisher.OrderCreated(event);
  }
}
