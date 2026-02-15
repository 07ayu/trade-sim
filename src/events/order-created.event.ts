export type OrderCreatedEvent = {
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  remainingQuantity: number;
  price: number;
  status: 'FAILED' | 'PENDING' | 'EXECUTED' | 'PARTIALLY_FILLED' | 'FILLED';
  createdAt?: Date;
};
