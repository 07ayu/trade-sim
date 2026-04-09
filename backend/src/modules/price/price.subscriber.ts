import { RedisSubscriber } from '../../infrastructure/redis/redis.subscriber';
import { Injectable, OnModuleInit } from '@nestjs/common';
import type { PriceUpdateEvent } from 'src/events/price-update.event';
import { GatewayGateway } from '../gateway/gateway.gateway';

@Injectable()
export class PriceSubscriber implements OnModuleInit {
  private priceMap: Map<string, number> = new Map();
  constructor(
    private redisSubscriber: RedisSubscriber,
    private gateway: GatewayGateway,
  ) {}

  async onModuleInit() {
    await this.redisSubscriber.subscribe('price_update', (msg: string) => {
      const data: PriceUpdateEvent = JSON.parse(
        msg,
      ) as unknown as PriceUpdateEvent;

      const { symbol, price } = data;

      this.priceMap.set(symbol, price);
      this.gateway.server.emit('price_update', symbol, price);
      console.log('price updated', symbol, price);
    });
  }

  getPrice(symbol: string): number | undefined {
    return this.priceMap.get(symbol);
  }

  getAllPrice() {
    return this.priceMap;
  }
}
