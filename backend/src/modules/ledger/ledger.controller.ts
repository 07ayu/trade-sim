import { AuthGuard } from '@nestjs/passport';
import { LedgerService } from './ledger.service';
import { Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';

@Controller('ledger')
@UseGuards(AuthGuard('jwt'))
export class LedgerController {
  constructor(private ledgerService: LedgerService) {}

  @Get('')
  async getUserLedger(@Req() req: any) {
    const userId = req.user.userId;
    const balance = this.ledgerService.getUserBalance(userId);
    const transactions = await this.ledgerService.getTransactionLogs(userId);

    return { ...balance, transactions };
  }

  @Post('refill')
  async refillCapital(@Req() req: any) {
    const userId = req.user.userId;
    const user = await this.ledgerService.refillCapital(userId);
    return { user };
  }

  @Post('reset')
  async resetAccount(@Req() req: any) {
    const userId = req.user.userId;
    const user = await this.ledgerService.resetAccount(userId);
    return { user };
  }

  @Get('logs')
  async getTradeLogs(@Req() req: any) {
    const userId = req.user.userId;
    return this.ledgerService.getTransactionLogs(userId);
  }
}
