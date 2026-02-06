// require("dotenv").config()
// const redis = require("redis")

// const subscriber = redis.createClient({
//     username: process.env.REDIS_USERNAME,
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: Number(process.env.REDIS_PORT),
//     },
// })


// const connectSubscriber = async () => {
//     await subscriber.connect()
//     console.log("subscriber connecteds")
// }