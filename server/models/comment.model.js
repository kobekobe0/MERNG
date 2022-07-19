const { model, Schema } = require('mongoose')

const Comment = new Schema({
    body: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    postId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
})

module.exports = model('Comment', Comment)
