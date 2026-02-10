const redis = require("redis")

const redisConfig = {
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
}

const publisher = redis.createClient(redisConfig)
const subscriber = publisher.duplicate()

publisher.on("error", (err) => console.error("publisher error", err))
subscriber.on("error", (err) => console.error("subscriber error", err))

const connectRedis = async () => {
    if (!publisher.isOpen) await publisher.connect()
    if (!subscriber.isOpen) await subscriber.connect()
    console.log("connected")
}

module.exports = { connectRedis, publisher, subscriber }