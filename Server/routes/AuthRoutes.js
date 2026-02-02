const { Signup , Login} = require("../Controllers/AuthControllers");
const { userVerification } = require("../middlewares/authMIddleware");
const router = require("express").Router();

router.post("/", userVerification)
router.post("/signup", Signup);
router.post("/login", Login)

module.exports = router