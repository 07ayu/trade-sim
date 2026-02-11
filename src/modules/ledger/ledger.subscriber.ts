import { LedgerService } from './ledger.service';
import { OrderCreatedEvent } from 'src/events/order-created.event';
import { RedisSubscriber } from './../../infrastructure/redis/redis.subscriber';
import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class LedgerSubscriber implements OnModuleInit {
  constructor(
    private redisSubscriber: RedisSubscriber,
    private ledgerService: LedgerService,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe('order_created', (msg: string) => {
      const data = JSON.parse(msg) as unknown as OrderCreatedEvent;
      this.ledgerService.updateBalance(data);
    });
  }
}
