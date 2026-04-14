import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().required(),
        REDIS_URL: Joi.string().required(),
        FRONTEND_URL: Joi.string().required(),
        
      }),
    }),
  ],
})
export class AppConfigModule {}
