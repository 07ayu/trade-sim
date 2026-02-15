import { Module } from '@nestjs/common';
import { RiskService } from './risk.service';
import { LedgerModule } from '../ledger/ledger.module';

@Module({
  imports: [LedgerModule],
  providers: [RiskService],
  exports: [RiskService],
})
export class RiskModule {}
