require("dotenv").config();

const { publisher, connectRedis } = require("../pubsub/redis")
const fetchCurrentPrice = require("./marketData")
const publishTick = require("./publisher")

async function start() {

    let running = true

    const sleep = (ms) => new Promise(res => setTimeout(res, ms))

    connectRedis()
    while (running) {
        try {
            const price = await fetchCurrentPrice()

            const tick = {
                symbol: "NSE:RELIANCE",
                price,
                // timestamp: Date.now(),
                // source: "poller"
            }
            await publisher.publish("price_update", JSON.stringify(tick))
            console.log("tick published", tick)
        } catch (error) {
            console.log("Market Ingestion Error", error.message)
            await sleep(5000)
        }
        await sleep(5000)
    }

}


start()