const mongoose = require('mongoose')

const PostData = new mongoose.Schema({
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})

const Post = mongoose.model('Post', PostData)

module.exports = Post
