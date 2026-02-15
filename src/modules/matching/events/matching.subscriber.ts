import { RiskResult } from './../../orders/interfaces/risk-result.interface';
import { MatchingService } from './../matching.service';
import { RedisPublisher } from 'src/infrastructure/redis/redis.publisher';
import { RedisSubscriber } from './../../../infrastructure/redis/redis.subscriber';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { OrderCreatedEvent } from 'src/events/order-created.event';

@Injectable()
export class MatchingSubscriber implements OnModuleInit {
  constructor(
    private redisSubscriber: RedisSubscriber,
    private redisPublisher: RedisPublisher,
    private matchingService: MatchingService,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe('order_created', (msg: string) => {
      const order = JSON.parse(msg) as unknown as OrderCreatedEvent;
      this.matchingService.addOrder(order);
    });
  }
}
