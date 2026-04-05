export interface TradeInterface {
  buyerUserId: string;
  sellerUserId: string;

  buyOrderId: string;
  sellOrderId: string;

  buyRemainingQuantity: number;
  sellRemainingQuantity: number;

  symbol: string;
  quantity: number;
  price: number;
  timestamp?: number;
}
