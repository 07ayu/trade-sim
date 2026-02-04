const axios = require("axios")

const fetchCurrentPrice = async (symbol) => {

    const base_url = "https://script.google.com/macros/s/AKfycbwNfDapLujvIYCItV5fDrU8JNmFNkpOfNDs9mtF1ZH2c4sFrb0xb5TXaKUIbE9RJNdtZw/exec"

    try {
        const res = await axios.get(`${base_url}?symbol=${encodeURIComponent(symbol)}`)
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