import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Types, HydratedDocument } from 'mongoose';

export type orderDocument = HydratedDocument<Order>;

@Schema({ timestamps: false })
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
  price: number;

  @Prop({
    enum: ['FAILED', 'EXECUTED'],
    default: 'EXECUTED',
  })
  status: 'FAILED' | 'EXECUTED';

  @Prop({
    required: true,
    enum: ['BUY', 'SELL'],
  })
  side: 'BUY' | 'SELL';

  @Prop({
    default: Date.now(),
  })
  createdAt: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
