const mongoose = require('mongoose')
const { Schema } = mongoose


const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 3,
        max: 10
    },
    userId: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    isThirdPartyUser: {
        type: Boolean
    },
    isEmailVerified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        trim: true
    },
    otp: {
        type: Number,
        default: -1
    },
    verificationToken: {
        type: String,
        expire_at: { type: Date, default: Date.now, expires: 300 }
    },
    phoneNumber: {
        type: Number,
        length: 10
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"]
    },
    dob: {
        type: Date,
    },
    notificationCount: {
        type: Number,
        default: 0
    },
    active: {
        type: Boolean,
        default: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('user', userSchema)