// import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
// import { UsersModule } from './modules/auth/models/use'
import { PriceModule } from './modules/price/price.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { PnlModule } from './modules/pnl/pnl.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AppConfigModule } from './config/configeration';
import { RiskModule } from './modules/risk/risk.module';
import { MatchingModule } from './modules/matching/matching.module';
import { GatewayModule } from './modules/gateway/gateway.module';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    // UsersModule,
    PriceModule,
    LedgerModule,
    OrdersModule,
    PnlModule,
    RedisModule,
    RiskModule,
    MatchingModule,
    GatewayModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
