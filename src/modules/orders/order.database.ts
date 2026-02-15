import { MongooseModule } from '@nestjs/mongoose';

import { Order, OrderSchema } from './models/order.schema';

export const OrderDatabaseModule = MongooseModule.forFeature([
  { name: Order.name, schema: OrderSchema },
]);
