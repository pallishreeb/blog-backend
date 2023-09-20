const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  postId: {
    type: String,
    unique: true,
  },
  text: {
    type: String,
  },
  images: [],
  docs: [],
  websitesLink: {
    type: String
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "category",
  },
  subcategory: {
    type: Schema.Types.ObjectId,
    ref: "subcategory",
  },
  brand: {
    type: String,
  },
  model: {
    type: String,
  },
  youtubeLink: {
    type: String,
  },
  views: {
    type: Number,
    default: 0,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("post", postSchema);
