import { RedisService } from './redis.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisPublisher {
  constructor(private redisService: RedisService) {}

  async publish(channel: string, message: any) {
    const client = this.redisService.getPublisher();
    await client.publish(channel, JSON.stringify(message));
  }
}
