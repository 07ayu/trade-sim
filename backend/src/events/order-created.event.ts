export interface OrderCreatedEvent {
  _id?: string;
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  remainingQuantity: number;
  price: number;
  status: 'PENDING' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELLED';
  createdAt: Date;
}
