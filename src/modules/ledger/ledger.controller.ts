import { LedgerService } from './ledger.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('ledger')
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Get(':userId')
  getUserLedger(@Param('userId') userId: string) {
    console.log(this.ledgerService.getUserBalance(userId));
    return this.ledgerService.getUserBalance(userId);
  }
}
