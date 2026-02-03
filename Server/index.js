require('dotenv').config();


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt")

const { OrdersModel } = require("./model/OrdersModel")
// const { HoldingsModel } = require("./model/HoldingsModel")
// const { PositionsModel } = require("./model/PositionsModel");
const bodyParser = require('body-parser');

const cors = require("cors")


const cookieParser = require("cookie-parser")

const authRoute = require("./routes/AuthRoutes")
const tradeRoute = require("./routes/tradeRoutes")
const PORT = process.env.PORT || 3000
const url = process.env.MONGO_URL

const app = express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())
app.use(bodyParser.json())
app.use("/", authRoute, tradeRoute)




app.get("/allHoldings", async (req, res) => {
    let allHoldings = await HoldingsModel.find({});

    res.json(allHoldings);
})

app.get("/allPositions", async (req, res) => {
    let allPositions = await PositionsModel.find({});

    res.json(allPositions);
})

app.post("/newOrder", async (req, res) => {

    const { name, qty, Price, mode } = req.body;

    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        Price: req.body.Price,
        mode: req.body.mode,
    })
    newOrder.save()

    res.json("Order Saved")
})



app.listen(PORT, () => {
    console.log(`App started!${PORT}`)
    mongoose.connect(url)
    // console.log("DB Connected")
    mongoose.connection.on("connected", () => {
        console.log("db coneected")
    })
});