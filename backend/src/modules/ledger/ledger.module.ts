import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { LedgerSubscriber } from './ledger.subscriber';
import { OrderDatabaseModule } from '../orders/order.database';
import { TradeDatabaseModule } from '../matching/models/trade.databse';

import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './models/transaction.schema';

@Module({
  imports: [
    RedisModule,
    OrderDatabaseModule,
    TradeDatabaseModule,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  controllers: [LedgerController],
  providers: [LedgerService, LedgerSubscriber],
  exports: [LedgerService],
})
export class LedgerModule {}
