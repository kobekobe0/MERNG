import { useState, useEffect, useContext } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import jwt_decode from 'jwt-decode'
import { PostsContext } from '../context/posts.context'

const DELETE_COMMENT = gql`
    mutation Mutation($postId: ID!, $commentId: ID!) {
        deleteComment(postId: $postId, commentId: $commentId)
    }
`

const GET_USER = gql`
    query GetUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            _id
            username
        }
    }
`

function SingleComment({ comment }) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            getUserId: comment.userId,
        },
    })

    const [own, setOwn] = useState(false)
    let date = Date.now() - parseInt(comment.createdAt)
    let time = date / 1000
    let minutes = time / 60
    let hours = minutes / 60
    let days = hours / 24
    let months = days / 30
    let years = months / 12

    let toShow = ''

    years > 1
        ? (toShow = `${Math.floor(years)} years ago`)
        : months > 1
        ? (toShow = `${Math.floor(months)} months ago`)
        : days > 1
        ? (toShow = `${Math.floor(days)} days ago`)
        : hours < 1.59
        ? (toShow = `1 hour ago`)
        : hours > 1.59
        ? (toShow = `${Math.floor(hours)} hours ago`)
        : minutes > 1
        ? (toShow = `${Math.floor(minutes)} minutes ago`)
        : (toShow = 'just now')

    useEffect(() => {
        if (data) {
            if (localStorage.getItem('token') !== null) {
                const userId = jwt_decode(localStorage?.getItem('token')).id
                if (comment.userId === userId) {
                    setOwn(true)
                }
            }
        }
    }, [data])
    const { commentDispatch } = useContext(PostsContext)

    const [deleteComment, { _, deleteLoading, commentError }] =
        useMutation(DELETE_COMMENT)

    const onDelete = async () => {
        console.log(comment.postId)
        console.log(comment.id)
        await deleteComment({
            variables: {
                postId: comment.postId,
                commentId: comment.id,
            },
        }).then(() => {
            commentDispatch({
                type: 'DELETE_COMMENT',
                payload: comment.id,
            })
        })
    }
    if (commentError) console.log(commentError)
    return (
        <div className="border p-5 w-full rounded-md mt-3">
            <div className="flex items-center mb-3 w-full justify-between">
                <div className="flex items-center mb-3 w-full">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                        className="w-10 h-10 rounded-full mr-3 bg-gray-200"
                    />
                    <div className="flex flex-col justify-center">
                        <p className="text-md font-semibold">
                            {data?.getUser?.username}
                        </p>
                        <p className="text-xs">{toShow}</p>
                    </div>
                </div>
                {own ? (
                    <button
                        onClick={onDelete}
                        className="border px-4 py-2 rounded-md bg-red-400 self-end mb-3 hover:bg-red-300 transition-all"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="1"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            />
                        </svg>
                    </button>
                ) : null}
            </div>

            <p>{comment.body}</p>
        </div>
    )
}

export default SingleComment
