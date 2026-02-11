import { RedisSubscriber } from './../../infrastructure/redis/redis.subscriber';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PnlSubscriber implements OnModuleInit {
  constructor(private redisSubscriber: RedisSubscriber) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe('price_update', () => {
      console.log('price updated in pnl');
    });
  }
}
