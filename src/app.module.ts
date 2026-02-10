import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PriceModule } from './nest/modules/price/price.module';
import { PriceModule } from './modules/orders/modules/price/price.module';
import { LedgerModule } from './modules/pnl/modules/ledger/ledger.module';
import { PriceModule } from './modules/price/price.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { PnlModule } from './modules/pnl/pnl.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { RedisModule } from './src/infrastructure/redis/redis.module';
import { RedisModule } from './infrastructure/redis/redis.module';

@Module({
  imports: [AuthModule, UsersModule, PriceModule, LedgerModule, OrdersModule, PnlModule, GatewayModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
