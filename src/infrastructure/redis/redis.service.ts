import { Injectable } from '@nestjs/common';
import { createClient } from 'redis';

type RedisClient = ReturnType<typeof createClient>;

@Injectable()
export class RedisService {
  private publisher!: RedisClient;
  private subscriber!: RedisClient;

  constructor() {
    const baseClient = createClient({
      socket: {
        host: '127.0.0.1',
        port: 6379,
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
