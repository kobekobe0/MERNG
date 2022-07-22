const Post = require('../../models/post.model')
const Comment = require('../../models/comment.model')
const checkAuth = require('../../utils/checkAuth')
const ObjectId = require('mongoose').Types.ObjectId
module.exports = {
    Query: {
        async getPosts() {
            let toReturn = []
            const posts = await Post.find().sort({ createdAt: -1 })
            console.log(posts)

            return posts
        },
        async getPost(parent, { postId }) {
            try {
                const post = await Post.findById(postId)
                let toReturn = {}
                if (post) {
                    toReturn.id = post._id
                    toReturn.title = post.title
                    toReturn.body = post.body
                    toReturn.createdAt = post.createdAt
                    toReturn.userId = post.userId
                    toReturn.likes = post.likes //awat Likes.find({postId: post._id})
                    toReturn.comments = post.comments //await Comments.find({postId: post._id})
                    return toReturn
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
            console.log('USER, ' + user.id)
            let toReturn = {}
            const newPost = await Post.create({
                body,
                userId: user.id,
            })
            toReturn.id = newPost._id
            toReturn.body = newPost.body
            toReturn.createdAt = newPost.createdAt
            toReturn.userId = newPost.userId
            toReturn.likes = []
            toReturn.comments = []
            return toReturn
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

        async likePost(parent, { postId }, context) {
            const user = checkAuth(context)
            if (user) {
                const post = await Post.findById(postId)
                if (post) {
                    const likes = post.likes
                    if (likes.includes(user.id)) {
                        await Post.findByIdAndUpdate(postId, {
                            $pull: {
                                likes: user.id,
                            },
                        })
                        return 'Post unliked'
                    }
                    await Post.findByIdAndUpdate(postId, {
                        $push: {
                            likes: user.id,
                        },
                    })
                    //console.log(user)
                    return 'Post liked'
                }
            } else {
                return 'You are not authorized to like this post'
            }
        },
    },
}
