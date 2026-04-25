// import { Order } from './../orders/models/order.schema';
import { Model } from 'mongoose';
// import { Order, OrderDocument } from './../orders/order.schema';
import { Injectable, OnModuleInit } from '@nestjs/common';
// import { OrderFilledEvent } from 'src/events/order-filled.event';
import { InjectModel } from '@nestjs/mongoose';
import { Trade, TradeDocument } from '../matching/models/trade.schema';
import { TradeInterface } from '../matching/interface/trade.interface';
import { error } from 'console';
import { Order, OrderDocument } from '../orders/models/order.schema';
import { Transaction, TransactionDocument } from './models/transaction.schema';

type balance = {
  cash: number;
  holdings: Map<string, number>;
};

@Injectable()
export class LedgerService implements OnModuleInit {
  //user balance
  private userBalance: Map<string, balance> = new Map();

  //injecting model
  constructor(
    @InjectModel(Trade.name)
    private readonly tradeModel: Model<TradeDocument>,
    @InjectModel(Order.name)
    private readonly orderModel: Model<OrderDocument>,
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  private async recordTransaction(
    userId: string,
    amount: number,
    type: 'deposit' | 'withdrawal' | 'trade' | 'refill' | 'reset',
    description: string,
    balanceAfter: number,
  ) {
    await this.transactionModel.create({
      userId,
      amount,
      type,
      status: 'completed',
      description,
      balanceAfter,
    });
  }

  private SeedSystemAccount() {
    this.userBalance.set('u0', {
      cash: 99999999,
      holdings: new Map([
        ['AAPL', 99999999],
        ['TSLA', 99999999],
      ]),
    });
    console.log('seed account u0 created');
  }

  //rebuilds from the ledger on startup
  async onModuleInit() {
    await this.rebuildFromTrade();
  }

  //apply trade changes to the ledger
  applyTrade(trades: TradeInterface) {
    const { buyerUserId, sellerUserId, symbol, quantity, price } = trades;

    const buyer = this.getOrCreateUser(buyerUserId)!;
    const seller = this.getOrCreateUser(sellerUserId)!;

    // console.log('balance updated', balance, userId)

    //buyer settlement
    buyer.cash -= quantity * price;
    const buyerQty = buyer.holdings.get(symbol) ?? 0;
    buyer?.holdings.set(symbol, buyerQty + quantity);

    //seller settlement
    seller.cash += quantity * price;
    const sellerQty = seller.holdings.get(symbol) ?? 0;
    seller.holdings.set(symbol, sellerQty - quantity);

    // Record transactions
    this.recordTransaction(
      buyerUserId,
      -(quantity * price),
      'trade',
      `Bought ${quantity} ${symbol} @ ${price}`,
      buyer.cash,
    );
    this.recordTransaction(
      sellerUserId,
      quantity * price,
      'trade',
      `Sold ${quantity} ${symbol} @ ${price}`,
      seller.cash,
    );
  }

  getOrCreateUser(userId: string) {
    //if the user has no user id then give him 10k

    if (!this.userBalance.has(userId)) {
      this.userBalance.set(userId, {
        cash: 10000,
        holdings: new Map(),
      });
    }
    return this.userBalance.get(userId);
  }

  async rebuildFromTrade() {
    this.userBalance.clear();
    const trades = await this.tradeModel.find().sort({ createdAt: 1 }).lean();
    console.log('got order details');
    for (const t of trades) {
      const trade: TradeInterface = {
        buyerUserId: t.buyerUserId.toString(),
        sellerUserId: t.sellerUserId.toString(),
        symbol: t.symbol,
        quantity: t.quantity,
        price: t.price,
        buyOrderId: '',
        sellOrderId: '',
        buyRemainingQuantity: 0,
        sellRemainingQuantity: 0,
      };
      this.applyTrade(trade);
    }

    // for (const order of orders) {
    //   const event: OrderFilledEvent = {
    //     userId: order.userId.toString(),
    //     symbol: order.symbol,
    //     side: order.side,
    //     quantity: order.quantity,
    //     price: order.price,
    //     status: order.status,
    //   };
    // this.updateBalance(event);
    // console.log('ledger ReHyderated');
    this.SeedSystemAccount();

    // }
  }

  getUserBalance(userId: string) {
    const balance = this.getOrCreateUser(userId);
    if (!balance) return null;

    // Convert Map to plain object for JSON serialization
    return {
      cash: balance.cash,
      holdings: Array.from(balance.holdings, ([symbol, quantity]) => ({
        name: symbol,
        qty: quantity,
      })),
    };
  }

  // async updateCash(
  //   userId: string,
  //   amount: number,
  //   type: 'deposit' | 'withdrawal',
  // ) {
  //   const user = this.getOrCreateUser(userId)!;

  //   if (type === 'withdrawal' && user.cash < amount) {
  //     throw new Error('Insufficient balance');
  //   }

  //   if (type === 'deposit') {
  //     user.cash += amount;
  //   } else {
  //     user.cash -= amount;
  //   }

  //   console.log('cash updated', user.cash);
  //   return user;
  // }

  async refillCapital(userId: string) {
    const user = this.getOrCreateUser(userId)!;
    const refillAmount = 10000 - user.cash;
    user.cash += refillAmount;
    
    await this.recordTransaction(
      userId,
      refillAmount,
      'refill',
      'Capital Refilled to 10k',
      user.cash,
    );

    console.log('capital refilled for user', userId);
    return user;
  }

  async resetAccount(userId: string) {
    const user = this.getOrCreateUser(userId)!;
    user.cash = 10000;
    user.holdings.clear();

    await this.recordTransaction(
      userId,
      10000,
      'reset',
      'Account Reset to 10k',
      user.cash,
    );

    console.log('account reset for user', userId);
    return user;
  }

  async getTransactionLogs(userId: string) {
    return this.transactionModel
      .find({ userId })
      .sort({ createdAt: -1 })
      .lean();
  }
}
