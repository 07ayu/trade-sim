const redis = require("redis")

const redisConfig = {
    socket: {
        host: "127.0.0.1",
        port: 6379
    }
}

const publisher = redis.createClient(redisConfig)
const subscriber = redis.createClient(redisConfig)

publisher.on("error", (err) => console.error("publisher error", err))
subscriber.on("error", (err) => console.error("subscriber error", err))

const connectRedish = async () => {
    if (!publisher.isOpen) await publisher.connect()
    if (!subscriber.isOpen) await subscriber.connect()
}

module.exports = { connectRedish, publisher, subscriber }