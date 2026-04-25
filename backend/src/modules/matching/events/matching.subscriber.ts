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
import { GatewayGateway } from 'src/modules/gateway/gateway.gateway';

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

    private gateway: GatewayGateway,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe(
      'order_created',
      async (msg: string) => {
        const order = JSON.parse(msg) as unknown as OrderCreatedEvent;
        const result = this.matchingService.addOrder(order);

        this.gateway.server.emit('orderbook_update', {
          symbol: order.symbol,
          depth: this.matchingService.getAggregatedOrderBook(order.symbol),
        });

        for (const trade of result.trades) {
          await this.tradeModel.create(trade);
          await this.redisPublisher.publish('trade_executed', trade);
        }

        try {
          // Update taker order in DB
          console.log(
            'updating taker order',
            result.takerOrder._id,
            result.takerOrder.status,
          );
          await this.orderModel.findByIdAndUpdate(result.takerOrder._id, {
            remainingQuantity: result.takerOrder.remainingQuantity,
            status: result.takerOrder.status,
          });
          this.gateway.sendOrderUpdates(result.takerOrder.userId, {
            message: 'order updated socket',
            symbol: result.takerOrder.symbol,
            status: result.takerOrder.status,
            _id: result.takerOrder._id?.toString(),
          });

          // Update all maker orders in DB
          console.log('updating maker orders', result.makerOrders.length);
          for (const makerOrder of result.makerOrders) {
            console.log('updating maker', makerOrder._id, makerOrder.status);
            await this.orderModel.findByIdAndUpdate(makerOrder._id, {
              remainingQuantity: makerOrder.remainingQuantity,
              status: makerOrder.status,
            });
            this.gateway.sendOrderUpdates(makerOrder.userId, {
              message: 'order updated socket',
              symbol: makerOrder.symbol,
              status: makerOrder.status,
              _id: makerOrder._id?.toString(),
            });
          }
        } catch (err) {
          console.error('Error updating orders in DB:', err);
        }
      },
    );
  }
}
