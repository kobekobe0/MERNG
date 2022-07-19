const Comment = require('../../models/comment.model')
const Post = require('../../models/post.model')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getCommentByPost(parent, { postId }) {
            try {
                const comments = Comment.find({
                    postId: postId,
                })

                if (comments) return comments

                throw new Error('Comments not found')
            } catch (err) {
                throw new Error(err)
            }
        },
    },
    Mutation: {
        async createComment(parent, { postId, body }, context) {
            const user = checkAuth(context)

            const post = await Post.findById(postId)
            if (!post) return 'Post not found'

            if (body.trim() === '') {
                throw new Error('Body is empty')
            }

            if (!postId) {
                throw new Error('PostId is empty')
            }

            if (!user)
                throw new Error('You are not authorized to create a comment')

            const newComment = Comment.create({
                postId: postId,
                userId: user.id,
                body: body,
            })
            console.log(newComment)
            return newComment
        },
        async deleteComment(parent, { postId, commentId }, context) {
            const user = checkAuth(context)
            const post = await Post.findById(postId)

            if (!post) throw new Error('Post not found')

            const comment = await Comment.findById(commentId)
            console.log(comment.userId)
            console.log(user.id)
            if (comment.userId.toString() !== user.id)
                throw new Error('You are not authorized to delete this comment')

            await Comment.findByIdAndDelete(commentId)
            return 'Comment deleted'
        },
    },
}
