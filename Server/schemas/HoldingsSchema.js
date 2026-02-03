const mongose = require("mongoose")

const HoldingsSchema = new mongose.Schema({
    name: String,
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
})

export default mongose.model("holding", HoldingsSchema)