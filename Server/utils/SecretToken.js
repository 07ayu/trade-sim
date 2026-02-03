const jwt = require("jsonwebtoken")

module.exports.CreateSecretToken = (id) => {
    return jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: 3 * 24 * 60 * 60,
    })
}

module.exports.CreateRefreshToken = (id) => {
    return jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresin: 3 * 60 * 60 * 24
    })
}
