require("dotenv").config();

const { redisClient, connectRedis } = require("../../utils/redis")
const fetchCurrentPrice = require("./marketData")
const publishTick = require("./publisher")

async function start() {
    await connectRedis();


    while (true) {
        try {
            const price = await fetchCurrentPrice()

            const tick = {
                symbol: "NSE:RELIANCE",
                price,
                timestamp: Date.now(),
                source: "poller"
            }
            await publishTick(tick)
            console.log("tick published", tick)
        } catch (error) {
            console.log("Market Ingestion Error", error.message)
        }
        await new Promise(res => setTimeout(res, 2000))
    }

}


start()