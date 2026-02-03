import mongoose from "mongoose"

const OrdersSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    symbol: {
        type: String,
        required: true,
        trim: true,
        uppercase: true
    },
    qty: {
        type: Number,
        min: 1,
        required: true

    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    side: {
        type: String,
        enum: ["BUY", "SELL"],
        required: true
    },
    status: {
        type: String,
        enum: ["FAILED", "EXECUTED"],
        default: "EXECUTED",
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export default mongoose.model("order", OrdersSchema)