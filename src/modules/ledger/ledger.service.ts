import { Injectable } from '@nestjs/common';
import { OrderFilledEvent } from 'src/events/order-filled.event';

type balance = {
  cash: number;
  holdings: Map<string, number>;
};

@Injectable()
export class LedgerService {
  private userBalance: Map<string, balance> = new Map();

  updateBalance(event: OrderFilledEvent) {
    const { userId, symbol, side, qty, price } = event;

    //if the user has no user id then give him 10k
    if (!this.userBalance.has(userId)) {
      this.userBalance.set(userId, {
        cash: 10000,
        holdings: new Map(),
      });
    }
    const balance = this.userBalance.get(userId);

    if (!balance) {
      return;
    }
    const currentQty = balance.holdings.get(symbol) ?? 0;

    if (side == 'BUY') {
      balance.cash -= qty * price;
      balance.holdings.set(symbol, currentQty + qty);
    } else {
      balance.cash += qty * price;
      balance.holdings.set(symbol, currentQty - qty);
    }

    console.log('balance updated', balance, userId);
  }

  getUserBalance(userId: string) {
    return this.userBalance.get(userId);
  }
}
