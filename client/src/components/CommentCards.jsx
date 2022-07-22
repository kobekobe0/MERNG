import { useContext, useEffect } from 'react'
import { PostsContext } from '../context/posts.context'
import { gql, useQuery } from '@apollo/client'
import SingleComment from './SingleComment'

const GET_COMMENTS = gql`
    query Query($postId: ID!) {
        getCommentByPost(postId: $postId) {
            id
            postId
            body
            createdAt
            userId
        }
    }
`
function CommentCards({ postId }) {
    const { loading, error, data } = useQuery(GET_COMMENTS, {
        variables: {
            postId: postId,
        },
    })
    const { comments, commentDispatch } = useContext(PostsContext)

    useEffect(() => {
        if (data) {
            commentDispatch({
                type: 'SET_COMMENTS',
                payload: data?.getCommentByPost,
            })
        }
        console.log(comments)
    }, [data])
    if (loading) return <p>Loading...</p>
    return (
        <div>
            {comments?.map((comment) => (
                <SingleComment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default CommentCards
