
const { subscriber } = require("../pubsub/redis")

const priceMap = new Map()

async function priceCache() {
    await subscriber.subscribe("price_update", (message) => {
        const tick = JSON.parse(message)
        priceMap.set(tick.symbol, tick.price)
        console.log("got price update", tick.symbol, tick.price)
    })
}

function getPrice(symbol) {
    return priceMap.get(symbol);
}

module.exports = { priceCache, getPrice }