import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';

export const userDatabaseModule = MongooseModule.forFeature([
  {
    name: User.name,
    schema: UserSchema,
  },
]);
