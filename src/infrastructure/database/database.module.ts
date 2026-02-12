import { Module, Global } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import mongoose, { Connection } from 'mongoose';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const uri = configService.get<string>('MONGO_URI');
        console.log('mongo uri', uri);
        return {
          uri,
          connectionFactory: (connection: Connection) => {
            console.log('mongo ready state', connection.readyState);
            if (connection.readyState === mongoose.ConnectionStates.connected) {
              console.log('MongoDB already connected');
            }
            connection.on('connected', () => {
              console.log('connected mongo');
            });
            connection.on('error', (err) => {
              console.log('mongoDb connection error', err);
            });
            connection.on('disconnected', () => {
              console.log('mongoDb disconnected');
            });
            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
