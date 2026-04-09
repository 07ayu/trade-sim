import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Order {
  @Prop({
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  })
  userId: Types.ObjectId;

  @Prop({
    trim: true,
    required: true,
    uppercase: true,
  })
  symbol: string;

  @Prop({
    min: 1,
    required: true,
  })
  quantity: number;

  @Prop({
    min: 0,
    required: true,
  })
  remainingQuantity: number;
  @Prop({
    min: 0,
    required: true,
  })
  price: number;

  @Prop({
    enum: ['PENDING', 'PARTIALLY_FILLED', 'FILLED', 'CANCELLED'],
    default: 'PENDING',
  })
  status: 'PENDING' | 'PARTIALLY_FILLED' | 'FILLED' | 'CANCELLED';

  @Prop({
    required: true,
    enum: ['BUY', 'SELL'],
  })
  side: 'BUY' | 'SELL';

  @Prop({
  //   // default: Date.now(),
  })
  createdAt: Date;
}

export type OrderDocument = HydratedDocument<Order>;
export const OrderSchema = SchemaFactory.createForClass(Order);
