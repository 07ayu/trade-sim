import { RedisService } from './redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisSubscriber {
  constructor(private redisService: RedisService) {}

  async subscribe(channel: string, callback: (msg: string) => void) {
    const client = this.redisService.getSubscriber();
    await client.subscribe(channel, callback);
  }
}
