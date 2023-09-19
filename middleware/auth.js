//Models
const User = require("../models/userModel");

const isAdmin = (req, res, next) => {
    if (req.user && req.user.email === "pallishreebehera01@gmail.com") {
        next()
    } else {
        res.status(401)
        throw new Error('Not Authorized for this action')
    }
}

module.exports = isAdmin