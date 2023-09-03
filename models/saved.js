
const mongoose = require('mongoose')
const { Schema } = mongoose

const savedSchema = new Schema({
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('saved', savedSchema)