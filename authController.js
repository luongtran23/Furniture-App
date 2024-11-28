const User = require('../models/Users')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

module.exports = {

    createUser: async (req, res) => {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            location: req.body.location,
            password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET).toString(),
        })

        try {
            await newUser.save();
            res.status(201).json({ message: "User successfully created" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.status(401).json("Wrong credentials, provide a valid email");
            }

            const decryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET);
            const decryptedPass = decryptedPassword.toString(CryptoJS.enc.Utf8);

            if (decryptedPass !== req.body.password) {
                return res.status(401).json("Wrong password");
            }

            const userToken = jwt.sign(
                {
                    id: user.id
                },
                process.env.JWT_SEC, // Sử dụng chính xác biến môi trường JWT_SEC
                { expiresIn: "7d" }
            );

            const { password, __v, createAt, updateAt, ...userData } = user._doc;
            res.status(200).json({ ...userData, userToken });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}
