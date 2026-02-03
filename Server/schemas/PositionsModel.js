const { model } = require("mongoose")

const { PositionsSchema } = require("./PositionsSchema")

const PositionsModel =  model("position", PositionsSchema)

module.exports = { PositionsModel }