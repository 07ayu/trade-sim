import { RedisPublisher } from '../../infrastructure/redis/redis.publisher';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPublisher {
  constructor(private redisPublisher: RedisPublisher) {}

  async OrderCreated(event: OrderCreatedEvent) {
    await this.redisPublisher.publish('order_created', event);
  }
}
