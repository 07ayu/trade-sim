import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceSubscriber } from './price.subscriber';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { GatewayModule } from '../gateway/gateway.module';

@Module({
  imports: [RedisModule, GatewayModule],
  controllers: [PriceController],
  providers: [PriceSubscriber, PriceService],
  exports: [PriceService],
})
export class PriceModule {}
