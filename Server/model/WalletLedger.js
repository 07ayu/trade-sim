import mongoose from "mongoose"

const WalletLedgerSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    },
    type: {
        type: String,
        enum: ["CREDIT", "DEBIT"],
        required: true
    },
    amount: {
        type: Number,
        min: 0,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now

    }

})

export default mongoose.model("WalletLedger", WalletLedgerSchema)