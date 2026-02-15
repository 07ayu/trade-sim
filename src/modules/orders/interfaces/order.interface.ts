export interface OrderPlain {
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'FAILED' | 'EXECUTED';
  createdAt: Date;
}
