const fetchCurrentPrice = require("../services/marketData")

module.exports.buy = (req, res) => {
    // const { symbol, qty } = req.body
    try {
        res.json({ message: "buy" })
        console.log(req)
    } catch (error) {
        console.log(error)
    }
}
