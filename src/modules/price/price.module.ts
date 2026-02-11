import { Module } from '@nestjs/common';
import { PriceController } from './price.controller';
import { PriceService } from './price.service';
import { PriceSubscriber } from './pirce.subscriber';
import { RedisModule } from 'src/infrastructure/redis/redis.module';

@Module({
  imports: [RedisModule],
  controllers: [PriceController],
  providers: [PriceSubscriber, PriceService],
  exports: [PriceService],
})
export class PriceModule {}
