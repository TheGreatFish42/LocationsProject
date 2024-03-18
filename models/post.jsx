const mongoose = require('mongoose')
const Schema = mongoose.Schema

const postSchema = new Schema({
  destination: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  imgUrl: {
    type: String,
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  username: {
    type: String,
    required: true
  },
  likedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }],
  dislikedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User",
  }]
})

module.exports = mongoose.model("Post", postSchema)