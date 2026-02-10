const { default: OrdersModel } = require("../model/OrdersModel")
const fetchCurrentPrice = require("../services/market-ingestion/marketData")
const { getPrice } = require("../services/pubsub/priceChache")
const { subscriber } = require("../services/pubsub/redis")

module.exports.buy = async (req, res) => {
    const { symbol, qty } = req.body
    const userID = req.user.id
    const price = getPrice(symbol)
    if (price == undefined) {
        return res.status
    }
    const totalPrice = price * qty

    // const placeOrder = new OrdersModel{
        
    // }
    try {
        res.json({ message: "buy" })
        console.log(price, userID)
    } catch (error) {
        console.log(error)
    }
}
