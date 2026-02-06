// require("dotenv").config()
// const redis = require("redis")

// const pub = redis.createClient({
//     username: process.env.REDIS_USERNAME,
//     password: process.env.REDIS_PASSWORD,
//     socket: {
//         host: process.env.REDIS_HOST,
//         port: Number(process.env.REDIS_PORT),
//     },
// })



// pub.on("error", (err) => {
//     console.log(err)
// })

// const connectRedis = async () => {
//     await pub.connect()
//     console.log("redis Connected")
// }

// module.exports = { pub, connectRedis }