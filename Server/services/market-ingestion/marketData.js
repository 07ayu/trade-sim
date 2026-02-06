const axios = require("axios")

const fetchCurrentPrice = async (symbol) => {

    const base_url = "https://script.google.com/macros/s/AKfycbw5ym4Z5GgcwOZRhSu-FEwuLFtZDzAL0EmwQHqp5KU7jMmYMtMWQelRMXdU1AkthU_V3A/exec"
    // ? symbol = ${ encodeURIComponent(symbol)

    try {
        const res = await axios.get(`${base_url}`)
        if (!res.data || res.data.length === 0) {
            throw new Error("invalid price data format")
        }
        const price = res.data.price

        if (isNaN(price)) {
            throw new Error("price is not a number")
        }
        console.log(price)
        return price
    } catch (error) {
        console.log("price fetch failed", error.message)
        throw error
    }

}

module.exports = fetchCurrentPrice