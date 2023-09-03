const mongoose = require('mongoose')
const { Schema } = mongoose

const metadataSchema = new Schema({
    siteName: {
        type: String
    },
    description: {
        type: String
    },
    logo: {
        type: String
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    featureImage: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('metadata', metadataSchema)