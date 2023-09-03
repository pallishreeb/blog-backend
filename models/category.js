const mongoose = require('mongoose')
const { Schema } = mongoose

const categorySchema = new Schema({
    categoryName:{
        type: String
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('category', categorySchema)