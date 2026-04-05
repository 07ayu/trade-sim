export type OrderCreatedEvent = {
  userId: string;
  symbol: string;
  side: 'BUY' | 'SELL';
  qty: number;
  price: number;
};
