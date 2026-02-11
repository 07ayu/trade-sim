import { PriceService } from './../price/price.service';
import { LedgerService } from './../ledger/ledger.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PnlService {
  constructor(
    private ledgerService: LedgerService,
    private priceService: PriceService,
  ) {}

  calculateUserPnl(userId: string) {
    const balance = this.ledgerService.getUserBalance(userId);

    if (!balance) return null;

    let portfolioValue = balance.cash;

    for (const [symbol, qty] of balance.holdings.entries()) {
      const price = this.priceService.getPrice(symbol) ?? 0;
      portfolioValue += qty * price;
    }
    return { cash: balance.cash, portfolioValue };
  }
}
