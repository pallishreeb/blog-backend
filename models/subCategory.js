const mongoose = require('mongoose')
const { Schema } = mongoose

const subcategorySchema = new Schema({
    subcategoryName:{
        type: String
    },
    categoryId:{
        type: Schema.Types.ObjectId,
        ref: "category",
    },
    createdAt:{
        type: Date,
        default: Date.now 
    }
})

module.exports = mongoose.model('subcategory', subcategorySchema)