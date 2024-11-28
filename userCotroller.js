const User = require("../models/Users");

module.exports = {
    deleteUser: async(req, res) => {
        try {
            await User.findByIdAndDelete(req.params.id);

            res.status(200).json('Sucessful deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    },

    getUser: async(req, res) => {
        try {
            const user = await User.findById(req.params.id);

            if (!user) {
                return res.status(404).json('User not found');
            }
            const { password, __v, createAt, updateAt, ...userData } = user._doc;

            res.status(200).json(userData) 
        } catch (error) {
            res.status(500).json(error)
        }
        }
}
