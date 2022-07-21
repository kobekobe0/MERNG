import React from 'react'
import { gql, useQuery } from '@apollo/client'
import SingleComment from './SingleComment'

const GET_COMMENTS = gql`
    query Query($postId: ID!) {
        getCommentByPost(postId: $postId) {
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
    console.log(data?.getCommentByPost)
    return (
        <div>
            {data?.getCommentByPost.map((comment) => (
                <SingleComment comment={comment} key={comment.id} />
            ))}
        </div>
    )
}

export default CommentCards
