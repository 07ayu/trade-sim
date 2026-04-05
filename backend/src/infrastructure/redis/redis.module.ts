import { Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisPublisher } from './redis.publisher';
import { RedisSubscriber } from './redis.subscriber';

@Module({
  providers: [RedisPublisher, RedisSubscriber, RedisService],
  exports: [RedisPublisher, RedisSubscriber],
})
export class RedisModule {}
