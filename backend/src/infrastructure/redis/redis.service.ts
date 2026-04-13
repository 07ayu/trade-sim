import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class RedisService implements OnModuleInit {
  private publisher!: RedisClient;
  private subscriber!: RedisClient;
  private readonly configService = new ConfigService();

  async onModuleInit() {
    const baseClient = createClient({
      url: this.configService.get<string>('REDIS_URL'),
      socket: {
        // host: '127.0.0.1',
        // port: 6379,
        tls: true,
        rejectUnauthorized: false,
      },
    });

    this.publisher = baseClient;
    this.subscriber = baseClient.duplicate();

    this.publisher.on('connect', () => {
      console.log('publisher connected');
    });
    this.publisher.on('error', (error) => {
      console.log('error', error);
    });

    this.subscriber.on('connect', () => {
      console.log('Subscriber connected');
    });
    this.subscriber.on('error', (error) => {
      console.log('error', error);
    });

    this.publisher.connect();
    this.subscriber.connect();
  }

  getPublisher(): RedisClient {
    return this.publisher;
  }
  getSubscriber(): RedisClient {
    return this.subscriber;
  }
}
