import { useParams } from 'react-router-dom'
import { gql, useQuery, useMutation } from '@apollo/client'
import PostUser from './PostUser'
import InputComment from './InputComment'
import CommentCards from './CommentCards'
import { PostsContext } from '../context/posts.context'
import { useContext, useState, useEffect } from 'react'
import jwt_decode from 'jwt-decode'
const GET_POST = gql`
    query GetPost($postId: ID!) {
        getPost(postId: $postId) {
            id
            userId
            body
            createdAt
            comments
            likes
        }
    }
`
const LIKE_POST = gql`
    mutation LikePost($postId: ID!) {
        likePost(postId: $postId)
    }
`

function Post() {
    const [liked, setLiked] = useState(false)

    const { loggedin, dispatch } = useContext(PostsContext)
    let { id } = useParams()
    console.log(id)
    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            postId: id,
        },
    })

    const [likePost] = useMutation(LIKE_POST)

    let userId = ''

    if (localStorage.getItem('token')) {
        userId = jwt_decode(
            localStorage?.getItem('token')?.replace('Bearer ', '')
        )?.id
    }

    const [likes, setLikes] = useState(data?.getPost?.likes?.length)

    const onLike = () => {
        if (localStorage.getItem('token')) {
            likePost({
                variables: {
                    postId: id,
                },
            }).then((res) => {
                dispatch({
                    type: 'LIKE_POST',
                    payload: id,
                })
                setLiked(true)
                setLikes((prev) => prev + 1)
            })
        }
    }
    const onUnLike = () => {
        if (localStorage.getItem('token')) {
            likePost({
                variables: {
                    postId: id,
                },
            }).then((res) => {
                dispatch({
                    type: 'UNLIKE_POST',
                    payload: id,
                })
                setLiked(false)
                setLikes((prev) => prev - 1)
            })
        }
    }

    useEffect(() => {
        setLiked(false)
        console.log(data)
        if (data?.getPost?.likes?.includes(userId)) {
            setLiked(true)
        }
        setLikes(data?.getPost?.likes?.length)
    }, [userId, localStorage, data])

    if (loading) return <div>Loading...</div>
    if (error) console.log(error)

    return (
        <div className="grid xl:grid-cols-12 lg:grid-cols-12 md:grid-cols-1 auto-cols-auto xl:mx-64">
            <PostUser
                userId={data?.getPost.userId}
                createdAt={data?.getPost.createdAt}
            />

            <div className=" lg:p-4 lg:pt-8 md:pt-0 flex flex-col">
                <div className="border p-5 w-full rounded-md">
                    <h1>{data?.getPost.body}</h1>
                    <div className="flex items-end justify-start">
                        {liked ? (
                            <button
                                onClick={onUnLike}
                                className="border border-blue-500 bg-blue-500 hover:bg-white hover:text-black transition-all rounded-md flex w-14 items-center justify-center mt-4 p-1 text-xs text-white"
                            >
                                {likes} like{likes > 1 ? 's' : ''}
                            </button>
                        ) : (
                            <button
                                onClick={onLike}
                                className="border border-blue-500 hover:bg-blue-500 hover:bg-white rounded-md flex w-14 items-center justify-center mt-4 p-1 text-xs"
                            >
                                {likes} like{likes > 1 ? 's' : ''}
                            </button>
                        )}
                    </div>
                </div>
                {loggedin && <InputComment postId={data?.getPost.id} />}

                <CommentCards postId={data?.getPost.id} />
            </div>
        </div>
    )
}

export default Post
