const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema(
  {
    name: String,
    password: String,
    avatar: String,
    status: String,
  },
  {
    collection: "users",
  }
)

module.exports = mongoose.model("User", UserSchema)
