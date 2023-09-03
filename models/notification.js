const mongoose = require('mongoose')
const { Schema } = mongoose

const notificationSchema = new Schema({
    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'comment',
    },
    replyId: {
        type: Schema.Types.ObjectId,
        ref: 'reply',
    },
    postId: {
        type: Schema.Types.ObjectId,
        ref: 'post',
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    postedTo: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('notification', notificationSchema)