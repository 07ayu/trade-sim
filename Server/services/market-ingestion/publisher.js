const { json } = require("body-parser")
const { redisClient } = require("../../utils/redis")

async function publishTick(tick) {

    await redisClient.publish("price_update", JSON.stringify(tick))

}

module.exports = publishTick