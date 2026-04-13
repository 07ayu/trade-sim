import { Module, Global } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RedisService } from './redis.service';
import { RedisPublisher } from './redis.publisher';
import { RedisSubscriber } from './redis.subscriber';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [RedisPublisher, RedisSubscriber, RedisService],
  exports: [RedisPublisher, RedisSubscriber],
})
export class RedisModule {}
