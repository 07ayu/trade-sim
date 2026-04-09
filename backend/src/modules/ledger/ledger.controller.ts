import { AuthGuard } from '@nestjs/passport';
import { LedgerService } from './ledger.service';
import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';

@Controller('ledger')
@UseGuards(AuthGuard('jwt'))
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Get('')
  async getUserLedger(@Req() req: any) {
    const userId = req.user.userId;
    console.log('balance', this.ledgerService.getUserBalance(userId));
    console.log('logs', await this.ledgerService.getTransactionLogs('u1'));

    return this.ledgerService.getUserBalance(userId);
  }

  // @Get('logs')
  // getTradeLogs(@Req() req: any) {
  //   const userId = req.user.userId;
  //   console.log(this.ledgerService.getTransactionLogs(userId));
  //   return this.ledgerService.getTransactionLogs(userId);
  // }
}
