export type OrderFilledEvent = {
  buyerUserId: string;
  sellerUserId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  quantity: number;
  remainingQuantity: number;
  price: number;
  status: 'FAILED' | 'PENDING' | 'EXECUTED' | 'PARTIALLY_FILLED' | 'FILLED';
  createdAt?: Date;
};
