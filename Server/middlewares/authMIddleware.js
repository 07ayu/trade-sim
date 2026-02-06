const User = require("../model/UserModel")
const jwt = require("jsonwebtoken")

module.exports.userVerification = (req, res, next) => {

    try {
        const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]

        if (!token) {
            return res.status(401).json({ Authenticated: false });
        }

        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = { id: data.id }
        next()

    } catch (error) {
        console.log("error at auth middleware", error)
        return res.status(401).json({ Authenticated: false });

    }


}