const User = require("../schemas/UserSchema")
const { CreateSecretToken } = require("../utils/SecretToken")
const bcrypt = require("bcrypt")

module.exports.Signup = async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password, username, createdAt } = req.body

        const ExistingUser = await User.findOne({ email })

        if (ExistingUser) {
            return res.json({ message: "user already exists" })
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = CreateSecretToken(user._id);

        res.cookie("token", token, {
            withCredential: false,
            httpOnly: false,
        })

        res.status(201).json({ message: " User Signed in Successfully", success: true, user })
        next();


    } catch (error) {
        console.error(error.message);
    }
}

module.exports.Login = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.json({ message: "all fields are required" })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.json({ message: "Incorrect email or password" })
        }
        const auth = await bcrypt.compare(password, user.password)
        if (!auth) {
            return res.json({ message: "incorrect password or email" })
        }

        const token = CreateSecretToken(user._id);
        res.cookie("token", token, {
            withCredential: true,
            httpOnly: false,
        })

        res.status(201).json({ message: "User logged in Successfully ", success: true })
        next()

    } catch (error) {
        console.error(error)
    }
}