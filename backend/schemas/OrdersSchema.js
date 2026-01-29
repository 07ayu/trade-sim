const { Schema } = require("mongoose")

const OrdersSchema = new Schema({
    name: String,
    qty: Number,
    Price: Number,
    mode: String,
})

module.exports = { OrdersSchema }