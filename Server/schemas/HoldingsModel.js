const { model } = require("mongoose")

const { HoldingsSchema } = require("./HoldingsSchema")

const HoldingsModel =  model("holding", HoldingsSchema)

module.exports = { HoldingsModel }