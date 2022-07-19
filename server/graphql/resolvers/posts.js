const Post = require('../../models/post.model')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getPosts() {
            const posts = await Post.find()
            return posts
        },
        async getPost(parent, { postId }) {
            try {
                const post = await Post.findById(postId)
                if (post)
                    return {
                        id: post._id,
                        userId: post.userId,
                        body: post.body,
                    }
                throw new Error('Post not found')
            } catch (err) {
                throw new Error(err)
            }
        },

        async getPostsByUser(parent, { userId }) {
            const posts = await Post.find({ userId })
            return posts
        },
    },
    Mutation: {
        async createPost(parent, { body }, context) {
            const user = checkAuth(context)
            console.log(user.id)

            const newPost = Post.create({
                body,
                userId: user.id,
            })

            return newPost
        },

        async deletePost(parent, { postId }, context) {
            const user = checkAuth(context)
            const post = await Post.findById(postId)

            if (!post) return 'Post not found'

            if (user.id !== post?.userId.toString()) {
                return 'You are not authorized to delete this post'
            }

            await Post.findByIdAndDelete(postId)
            return 'Post deleted'
        },
    },
}
