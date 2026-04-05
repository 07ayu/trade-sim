// import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PriceModule } from './modules/price/price.module';
import { OrdersModule } from './modules/orders/orders.module';
import { LedgerModule } from './modules/ledger/ledger.module';
import { PnlModule } from './modules/pnl/pnl.module';
import { GatewayModule } from './modules/gateway/gateway.module';
import { RedisModule } from './infrastructure/redis/redis.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AppConfigModule } from './config/configeration';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    PriceModule,
    LedgerModule,
    OrdersModule,
    PnlModule,
    GatewayModule,
    RedisModule,
    PriceModule,
    // MongooseModule.forRoot(
    //   'mongodb+srv://Zerodha-clone:Zerodha-clone@zerodha-clone.vsed0wb.mongodb.net/zerodha?appName=Zerodha-Clone',
    // ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
