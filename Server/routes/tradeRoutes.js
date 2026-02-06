const router = require("express").Router()
const { buy } = require("../Controllers/tradeController")
const { userVerification } = require("../middlewares/authMIddleware")

router.post("/buy", userVerification, buy)

module.exports = router