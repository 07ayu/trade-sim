export class OrderCreatedDto {
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  remainingQuantity: number;
  price: number;
  status: 'FAILED' | 'PENDING' | 'EXECUTED' | 'PARTIALLY_FILLED';
  createdAt: Date;
}
