import { useContext, useState } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { PostsContext } from '../context/posts.context'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

const GET_USER = gql`
    query GetUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            username
        }
    }
`

const DELETE_POST = gql`
    mutation Mutation($postId: ID!) {
        deletePost(postId: $postId)
    }
`

const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId)
    }
`

function PostCard({ post }) {
    const history = useNavigate()
    const [own, setOwn] = useState(false)
    const { dispatch, loggedin } = useContext(PostsContext)
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            getUserId: post.userId,
        },
    })
    const [likePost] = useMutation(LIKE_POST)
    const [deletePost] = useMutation(DELETE_POST)

    let userId = ''

    if (localStorage.getItem('token')) {
        userId = jwt_decode(
            localStorage?.getItem('token')?.replace('Bearer ', '')
        )?.id
    }

    const [liked, setLiked] = useState(false)

    const onDelete = async () => {
        await deletePost({ variables: { postId: post.id } }).then(() => {
            dispatch({ type: 'DELETE_POST', payload: post.id })
        })
    }

    const onLike = () => {
        if (localStorage.getItem('token')) {
            likePost({
                variables: {
                    postId: post.id,
                },
            }).then((res) => {
                dispatch({
                    type: 'LIKE_POST',
                    payload: post.id,
                })
                setLiked(true)
            })
        } else {
            history('/login')
        }
    }
    const onUnLike = () => {
        if (localStorage.getItem('token')) {
            likePost({
                variables: {
                    postId: post.id,
                },
            }).then((res) => {
                dispatch({
                    type: 'UNLIKE_POST',
                    payload: post.id,
                })
                setLiked(false)
            })
        }
    }

    useEffect(() => {
        setLiked(false)
        if (post.likes.includes(userId)) {
            setLiked(true)
        }
        if (data) {
            if (userId === post.userId) setOwn(true)
        }
    }, [userId, localStorage, data])

    if (loading) return <div>Loading...</div>
    let date = Date.now() - parseInt(post.createdAt)
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

    return (
        <div className="border flex flex-col rounded-md p-3 max-h-48  ">
            <div className="flex justify-between">
                <div className="flex items-center text-md font-semibold">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                        alt=""
                        className="w-8 h-8 rounded-full mr-3 bg-gray-200"
                    />
                    <div className="flex flex-col justify-center">
                        <p>{data?.getUser.username}</p>
                        <p className="text-xs font-light">{toShow}</p>
                    </div>
                </div>
                {own && loggedin ? (
                    <div
                        onClick={onDelete}
                        className="flex items-center border px-2 rounded-md bg-red-400 transition-all hover:bg-red-300"
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
                    </div>
                ) : null}
            </div>

            <div className="py-4">
                <p>{post.body}</p>
            </div>

            <div className="w-full flex justify-end gap-5">
                {liked ? (
                    <button
                        onClick={onUnLike}
                        className="border px-3 text-xs border-blue-500 rounded-md hover:bg-white text-white bg-blue-500 hover:text-black"
                    >
                        {post.likes?.length} like
                        {post.likes?.length > 1 ? 's' : ''}
                    </button>
                ) : (
                    <button
                        onClick={onLike}
                        className="border text-xs px-3 border-blue-500 rounded-md hover:bg-blue-500 hover:text-white"
                    >
                        {post.likes?.length} Like
                        {post.likes?.length > 1 ? 's' : ''}
                    </button>
                )}
                <button className="border rounded-md px-3 border-blue-500 hover:bg-blue-500 hover:text-white text-xs py-1   ">
                    <Link to={`/post/${post.id}`}>
                        {post.comments?.length} Comment
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default PostCard
