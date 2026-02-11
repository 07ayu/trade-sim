import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisPublisher } from './infrastructure/redis/redis.publisher';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  //temp
  const publisher = app.get(RedisPublisher);
  // const subscriber = app.get(RedisSubscriber);

  // await subscriber.subscribe('test_channel', (msg: string) => {
  //   console.log('got it', msg);
  // });

  setInterval(() => {
    (async () => {
      console.log('publishing msg.....');
      await publisher.publish('price_update', {
        symbol: 'APPL',
        price: 1440,
      });
    })().catch(console.error);
  }, 20000);
}
bootstrap().catch(console.error);
