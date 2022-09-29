const mongoose = require("mongoose")

const Schema = mongoose.Schema

const PostSchema = new Schema(
  {
    content: String,
    author: Object,
    date: String,
  },
  {
    collection: "posts",
  }
)

module.exports = mongoose.model("Post", PostSchema)
