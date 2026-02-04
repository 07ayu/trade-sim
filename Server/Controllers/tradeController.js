const fetchCurrentPrice = require("../services/marketData")

module.exports.buy = async (req, res) => {
    const { symbol, qty } = req.body

    const price =
    await fetchCurrentPrice(symbol)
    if (price == undefined) {
        return res.status
    }
    const totalPrice = price * qty
    try {
        res.json({ message: "buy" })
        console.log(req.body)
    } catch (error) {
        console.log(error)
    }
}
