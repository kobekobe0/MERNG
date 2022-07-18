const { model, Schema } = require('mongoose')

const Comment = new Schema({
    description: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
})

module.exports = model('Comment', Comment)
