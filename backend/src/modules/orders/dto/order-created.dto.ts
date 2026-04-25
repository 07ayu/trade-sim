export class OrderCreatedDto {
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  price: number;
  status: 'FAILED' | 'PENDING' | 'EXECUTED' | 'PARTIALLY_FILLED';
  createdAt: Date;
}
