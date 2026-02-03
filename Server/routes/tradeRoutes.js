const router = require("express").Router()
const { buy } = require("../Controllers/tradeController")

router.post("/buy", buy)

module.exports = router