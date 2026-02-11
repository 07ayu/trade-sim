import { Module } from '@nestjs/common';
import { PnlController } from './pnl.controller';
import { PnlService } from './pnl.service';
import { RedisModule } from 'src/infrastructure/redis/redis.module';
import { PnlSubscriber } from './pnl.subscriber';
import { LedgerModule } from '../ledger/ledger.module';
import { PriceModule } from '../price/price.module';

@Module({
  imports: [RedisModule, LedgerModule, PriceModule],
  controllers: [PnlController],
  providers: [PnlService, PnlSubscriber],
})
export class PnlModule {}
