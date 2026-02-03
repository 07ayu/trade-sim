const { Signup , Login, me} = require("../Controllers/AuthControllers");
const { userVerification } = require("../middlewares/authMIddleware");
const router = require("express").Router();
// const me = require("../Controllers/")


router.post("/", userVerification)
router.post("/signup", Signup);
router.post("/login", Login)
router.get("/me", me)

// router.get("/refresh", (req, res) => {

// })

module.exports = router