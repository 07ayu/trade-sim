import { RiskService } from './../risk/risk.service';
import { Order, type OrderDocument } from './models/order.schema';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { OrderPublisher } from './order.publisher';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { OrderCreatedDto } from './dto/order-created.dto';
import { GatewayGateway } from '../gateway/gateway.gateway';
import { symbol } from 'joi';

@Injectable()
export class OrdersService {
  constructor(
    private orderPublisher: OrderPublisher,
    private riskService: RiskService,
    private gateway: GatewayGateway,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
  ) {}

  async createOrder(userId: string, dto: OrderCreatedDto) {
    const event: OrderCreatedEvent = {
      userId,
      symbol: dto.symbol,
      side: dto.side,
      quantity: dto.quantity,
      remainingQuantity: dto.quantity,
      price: dto.price,
      status: 'PENDING',
      createdAt: dto.createdAt,
    };
    this.riskService.validateOrder(event);

    const saveOrder = await this.orderModel.create(event);

    this.gateway.sendOrderUpdates(userId, {
      message: 'order created socket',
      symbol: saveOrder.symbol,
      status: saveOrder.status,
      _id: saveOrder._id.toString(),
    });
    console.log('order status update sent', saveOrder);

    console.log('saved order with _id', saveOrder._id.toString());
    const OrderEvent = {
      ...event,
      _id: saveOrder._id.toString(),
    };
    console.log('publishing order with _id', OrderEvent._id);
    await this.orderPublisher.OrderCreated(OrderEvent);
  }

  async getOrder(userId: string) {
    console.log('order service working');
    const orders = await this.orderModel.find({ userId });
    return orders;
  }
}
