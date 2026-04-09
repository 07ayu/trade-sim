import { Module, Global } from '@nestjs/common';
import { RedisService } from './redis.service';
import { RedisPublisher } from './redis.publisher';
import { RedisSubscriber } from './redis.subscriber';

@Global()
@Module({
  providers: [RedisPublisher, RedisSubscriber, RedisService],
  exports: [RedisPublisher, RedisSubscriber],
})
export class RedisModule {}
