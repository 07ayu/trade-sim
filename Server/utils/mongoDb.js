const mongoose = require("mongoose")

const connectMongo = async () => {
    const url = process.env.MONGO_URL
    // console.log("DB Connected")
    mongoose.connection.on("connected", () => {
        console.log("db conected")
    })
    await mongoose.connect(url)

}

module.exports = { connectMongo }