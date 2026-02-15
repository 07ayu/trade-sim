import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { OrderPublisher } from './order.publisher';
import { OrderDatabaseModule } from './order.database';
import { RiskModule } from '../risk/risk.module';

@Module({
  imports: [RedisModule, OrderDatabaseModule, RiskModule],
  controllers: [OrdersController],
  providers: [OrdersService, OrderPublisher],
  exports: [OrdersService],
})
export class OrdersModule {}
