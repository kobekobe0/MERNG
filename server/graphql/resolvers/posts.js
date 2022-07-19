const Post = require('../../models/post.model')

module.exports = {
    Query: {
        async getPosts() {
            const posts = await Post.find()
            return posts
        },
    },
}
