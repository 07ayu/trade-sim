import { Module } from '@nestjs/common';
import { MatchingService } from './matching.service';
import { MatchingController } from './matching.controller';
import { MatchingSubscriber } from './events/matching.subscriber';
import { TradeDatabaseModule } from './models/trade.databse';
import { Match } from './match/matching.engine';
import { OrderDatabaseModule } from '../orders/order.database';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { GatewayModule } from 'src/modules/gateway/gateway.module';

@Module({
  imports: [
    TradeDatabaseModule,
    OrderDatabaseModule,
    RedisModule,
    GatewayModule,
  ],
  controllers: [MatchingController],
  providers: [MatchingService, MatchingSubscriber, Match],
  exports: [TradeDatabaseModule],
})
export class MatchingModule {}
