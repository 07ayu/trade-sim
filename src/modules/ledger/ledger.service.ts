import { Model } from 'mongoose';
import { Order, OrderDocument } from '../orders/models/order.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { OrderFilledEvent } from 'src/events/order-filled.event';
import { InjectModel } from '@nestjs/mongoose';

type balance = {
  cash: number;
  holdings: Map<string, number>;
};

@Injectable()
export class LedgerService implements OnModuleInit {
  private userBalance: Map<string, balance> = new Map();
  constructor(
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
  ) {}

  async onModuleInit() {
    await this.rebuildFromOrder();
  }

  updateBalance(event: OrderFilledEvent) {
    const { userId, symbol, side, quantity, price } = event;

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
    const currentQuantity = balance.holdings.get(symbol) ?? 0;

    if (side == 'BUY') {
      balance.cash -= quantity * price;
      balance.holdings.set(symbol, currentQuantity + quantity);
    } else {
      balance.cash += quantity * price;
      balance.holdings.set(symbol, currentQuantity - quantity);
    }

    console.log('balance updated', balance, userId);
  }

  getUserBalance(userId: string) {
    return this.userBalance.get(userId);
  }

  async rebuildFromOrder() {
    this.userBalance.clear();
    const orders = await this.orderModel
      .find({ status: 'EXECUTED' })
      .sort({ createdAt: 1 })
      .lean();
    console.log('got order details');

    for (const order of orders) {
      const event: OrderFilledEvent = {
        userId: order.userId.toString(),
        symbol: order.symbol,
        side: order.side,
        quantity: order.quantity,
        price: order.price,
        status: order.status,
      };
      this.updateBalance(event);
      console.log('ledger ReHyderated');
    }
  }
}
