import { OrderCreatedEvent } from 'src/events/order-created.event';
import { LedgerService } from './../ledger/ledger.service';
import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class RiskService {
  constructor(private ledgerService: LedgerService) {}
  validateOrder(event: OrderCreatedEvent) {
    const { userId, side, quantity, price, symbol } = event;

    const balance = this.ledgerService.getUserBalance(userId);

    //new user only if starting capital allows it

    if (!balance) {
      if (side === 'SELL') {
        throw new BadRequestException('Cannot sell without Holdings');
      }
      return true;
    }

    if (side === 'BUY') {
      const requiredCash = quantity * price;
      if (balance.cash < requiredCash) {
        throw new BadRequestException('insufficient funds to buy');
      }
    }

    if (side === 'SELL') {
      const currentQuantity = balance.holdings.get(symbol) ?? 0;

      if (currentQuantity < quantity) {
        throw new BadRequestException('insufficient holdings to sell');
      }
    }
    return true;
  }
}
