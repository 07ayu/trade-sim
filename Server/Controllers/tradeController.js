const fetchCurrentPrice = require("../services/market-ingestion/marketData")

module.exports.buy = async (req, res) => {
    const { symbol, qty } = req.body
    const userID = req.user.id
    const price = await fetchCurrentPrice(symbol)
    if (price == undefined) {
        return res.status
    }
    const totalPrice = price * qty
    try {
        res.json({ message: "buy" })
        console.log(price, userID)
    } catch (error) {
        console.log(error)
    }
}
