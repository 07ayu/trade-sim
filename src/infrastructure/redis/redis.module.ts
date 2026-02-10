import { Module } from '@nestjs/common';

@Module({
  providers: [RedisPublisher, RedisSubscriber],
  exports: [RedisPublisher, RedisSubscriber],
})
export class RedisModule {}
