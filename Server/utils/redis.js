const redis = require("redis")

const redisClient = redis.createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
})

redisClient.on("error", (err) => {
    console.log(err)
})

const connectRedis = async () => {
    await redisClient.connect()
    console.log("redis Connected")
}

module.exports = { redisClient, connectRedis }