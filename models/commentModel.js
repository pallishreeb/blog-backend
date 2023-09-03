const mongoose = require('mongoose')
const { Schema } = mongoose

const commentSchema = new Schema({
    comment: {
        type: String
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('comment', commentSchema)