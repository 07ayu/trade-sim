const User = require("../model/UserModel")
const { CreateSecretToken } = require("../utils/SecretToken")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
    try {
        console.log(req.body)
        const { email, password, username, createdAt } = req.body

        const ExistingUser = await User.findOne({ email })

        if (ExistingUser) {
            return res.Status(409).json({ message: "user already exists" })
        }

        const user = await User.create({ email, password, username, createdAt });
        const token = CreateSecretToken(user._id, user.email);

        res.cookie("token", token, {
            secure: false,
            httpOnly: true,
            sameSite: "lax"
        })

        res.status(201).json({
            message: " User Signed in Successfully", success: true, user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })


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
            httpOnly: true,
            secure: false,
            sameSite: "lax"
        })

        res.status(201).json({
            message: "User logged in Successfully ",
            success: true,
            token,
            user: {
                id: user._id,
                email: user.email,
                username: user.username
            }
        })

    } catch (error) {
        console.error(error)
    }
}

module.exports.me = async (req, res) => {
    const token = req.cookies.token;


    if (!token) {
        return res.json({ Authenticated: false });
    }

    try {
        const userData = await User.findById(req.user.id).select("-password")
        // console.log(user)
        if (!userData) {
            return res.json({ Authentication: false })
        }
        res.json({
            Authenticated: true,
            user: {
                id: userData._id,
                email: userData.email,
                username: userData.username
            }
        })

    } catch (error) {
        res.json({ Authenticated: false })
    }
}

module.exports.logout = ("/logout", (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        sameSite: "lax",
    });

    res.status(200).json({ message: "Logged Out" })
})