import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Trade {
  @Prop({ required: true })
  buyerUserId: string;

  @Prop({ required: true })
  sellerUserId: string;

  @Prop({ required: true })
  symbol: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ required: true })
  price: number;
}

export type TradeDocument = HydratedDocument<Trade>;
export const tradeSchema = SchemaFactory.createForClass(Trade);
