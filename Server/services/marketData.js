const axios = require("axios")

const fetchCurrentPrice = async (symbol) => {
    try {
        const res = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${process.env.ALPHAVANTAGE_API_KEY}`)
        const price = (res.data["Global Quote"]["05. price"])
        return parseFloat(price)
    }
    catch (err) {
        console.log(err)
    }
}

module.exports = fetchCurrentPrice