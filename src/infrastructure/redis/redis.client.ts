import Redis from 'redis';

const redisConfig = {
  socket: {
    host: '127.0.0.1',
    port: 6379,
  },
};

export const createClientRedis = async () => {
  const publisher = Redis.createClient(redisConfig);
  const subscriber = publisher.duplicate();

  await publisher.connect();
  await subscriber.connect();

  return { publisher, subscriber };
};
