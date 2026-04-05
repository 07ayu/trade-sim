import { PnlService } from './pnl.service';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('pnl')
export class PnlController {
  constructor(private pnlService: PnlService) {}

  @Get(':userId')
  getPnl(@Param('userId') userId: string) {
    return this.pnlService.calculateUserPnl(userId);
  }
}
