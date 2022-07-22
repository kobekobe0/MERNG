const Comment = require('../../models/comment.model')
const Post = require('../../models/post.model')
const checkAuth = require('../../utils/checkAuth')

module.exports = {
    Query: {
        async getCommentByPost(parent, { postId }) {
            try {
                const comments = Comment.find({
                    postId: postId,
                }).sort({ createdAt: -1 })

                if (comments) return comments

                throw new Error('Comments not found')
            } catch (err) {
                throw new Error(err)
            }
        },
    },
    Mutation: {
        async createComment(parent, { postId, body }, context) {
            try {
                const user = checkAuth(context)
                let toReturn = {}
                const post = await Post.findById(postId)
                if (!post) return 'Post not found'

                if (body.trim() === '') {
                    throw new Error('Body is empty')
                }

                if (!postId) {
                    throw new Error('PostId is empty')
                }

                if (!user)
                    throw new Error(
                        'You are not authorized to create a comment'
                    )

                console.log(user)

                const newComment = await Comment.create({
                    postId: postId,
                    userId: user.id,
                    body: body,
                })

                await post.updateOne({
                    $push: { comments: newComment._id },
                })

                console.log(user)
                toReturn.id = newComment._id
                toReturn.body = newComment.body
                toReturn.createdAt = newComment.createdAt
                toReturn.user = user
                toReturn.userId = user.id
                toReturn.postId = newComment.postId
                toReturn.likes = newComment.likes

                console.log(toReturn.user)
                return toReturn
            } catch (err) {
                throw new Error(`Something went wrong: ${err}`)
            }
        },
        async deleteComment(parent, { postId, commentId }, context) {
            console.log(postId)
            console.log(commentId)
            try {
                const user = checkAuth(context)
                const post = await Post.findById(postId)

                if (!post) throw new Error('Post not found')

                const comment = await Comment.findById(commentId)
                console.log(comment.userId)
                console.log(user.id)
                if (comment.userId.toString() !== user.id)
                    throw new Error(
                        'You are not authorized to delete this comment'
                    )
                await post.updateOne({
                    $pull: {
                        comments: commentId,
                    },
                })
                await Post.findByIdAndUpdate(postId, {
                    $pull: {
                        comments: commentId,
                    },
                })
                await Comment.findByIdAndDelete(commentId)
                return 'Comment deleted'
            } catch (error) {
                console.log(error)
                throw new Error(`Something went wrong: ${error}`)
            }
        },
        async updateComment(parent, { postId, commentId, body }, context) {
            try {
                const user = checkAuth(context)
                const post = await Post.findById(postId)
                let toReturn = {}
                if (!post) throw new Error('Post not found')

                const comment = await Comment.findById(commentId)
                if (!comment) throw new Error('Comment not found')

                if (comment.userId.toString() !== user.id)
                    throw new Error(
                        'You are not authorized to update this comment'
                    )

                const updated = await Comment.findByIdAndUpdate(
                    commentId,
                    {
                        $set: {
                            body: body,
                        },
                    },
                    { new: true }
                )
                toReturn.id = updated._id
                toReturn.body = updated.body
                toReturn.createdAt = updated.createdAt
                toReturn.user = user
                toReturn.user._id = user.id
                toReturn.postId = updated.postId
                toReturn.likes = updated.likes

                console.log(updated)
                return toReturn
            } catch (err) {
                throw new Error('Something went wrong: ' + err)
            }
        },
    },
}
