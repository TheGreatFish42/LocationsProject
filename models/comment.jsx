const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    likedUsers: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    dislikedUsers: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})


module.exports = mongoose.model("comment", commentSchema)