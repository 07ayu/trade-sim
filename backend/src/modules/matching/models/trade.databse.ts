import { MongooseModule } from '@nestjs/mongoose';
import { Trade, tradeSchema } from './trade.schema';

export const TradeDatabaseModule = MongooseModule.forFeature([
  { name: Trade.name, schema: tradeSchema },
]);
