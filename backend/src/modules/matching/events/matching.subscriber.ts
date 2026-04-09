import { RiskResult } from './../../orders/interfaces/risk-result.interface';
import { MatchingService } from './../matching.service';
import { RedisPublisher } from 'src/infrastructure/redis/redis.publisher';
import { RedisSubscriber } from './../../../infrastructure/redis/redis.subscriber';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { Trade, TradeDocument } from '../models/trade.schema';
// import { Order } from 'src/modules/orders/models/order.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from 'src/modules/orders/models/order.schema';

@Injectable()
export class MatchingSubscriber implements OnModuleInit {
  constructor(
    private redisSubscriber: RedisSubscriber,
    private redisPublisher: RedisPublisher,
    private matchingService: MatchingService,
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(Trade.name)
    private tradeModel: Model<TradeDocument>,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe(
      'order_created',
      async (msg: string) => {
        const order = JSON.parse(msg) as unknown as OrderCreatedEvent;
        const result = this.matchingService.addOrder(order);

        for (const trade of result.trades) {
          await this.tradeModel.create(trade);
          await this.redisPublisher.publish('trade_executed', trade);
        }

        if (result.remainingOrder) {
          // await this.redisPublisher.publish(
          //   'order_updated',
          //   result.remainingOrder,
          // );

          await this.orderModel.findByIdAndUpdate(result.remainingOrder._id, {
            remainingQuantity: result.remainingOrder.remainingQuantity,
            status: result.remainingOrder.status,
          });
        }
      },
    );
  }
}
