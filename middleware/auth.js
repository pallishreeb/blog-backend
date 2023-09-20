//Models
const User = require("../models/userModel");
//"pallishreebehera01@gmail.com"
const isAdmin = async (req, res, next) => {
    if (req.user && req.user.email) {
        const user = await User.findOne({ email: req.user.email });
        if (user && user.isAdmin === true) {
            next()
        }

    } else {
        res.status(401)
        throw new Error('Not Authorized for this action')
    }
}

module.exports = isAdmin