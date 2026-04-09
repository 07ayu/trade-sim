import cookieParser from 'cookie-parser';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RedisPublisher } from './infrastructure/redis/redis.publisher';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 3000);

  //live market simulator
  const publisher = app.get(RedisPublisher);
  // const subscriber = app.get(RedisSubscriber);

  //list of symbols
  const symbols = [
    'AAPL',
    'TSLA',
    'RELIANCE',
    'INFY',
    'TCS',
    'HDFC',
    'WIPRO',
    'BAJFIN',
    'AXISBANK',
    'ITC',
  ];

  //base price for the simulation
  const basePrices = {
    AAPL: 1555.45,
    TSLA: 116.8,
    RELIANCE: 2561.3,
    INFY: 1295.6,
    TCS: 3812.9,
    HDFC: 1587.4,
    WIPRO: 451.8,
    BAJFIN: 7120.5,
    AXISBANK: 1045.2,
    ITC: 462.35,
  };
  //keeping track of current price
  let currentPrices = { ...basePrices };

  setInterval(() => {
    (async () => {
      //pick a random symbol
      const symbol = symbols[Math.floor(Math.random() * symbols.length)];

      const changePercent = (Math.random() - 0.5) * 0.002;
      currentPrices[symbol] = Number(
        (currentPrices[symbol] * (1 + changePercent)).toFixed(2),
      );

      await publisher.publish('price_update', {
        symbol,
        price: currentPrices[symbol],
        // timestamp: Date.now(),
      });
      console.log(currentPrices[symbol]);
    })().catch(console.error);
  }, 3000);
}
bootstrap().catch(console.error);
