import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class RedisPublisher {
  private client: redis;

  constructor() {
    this.client = new Redis();
  }
  publish(channel: string, message: any) {
    this.client.publish(this.channel, this);
  }
}
