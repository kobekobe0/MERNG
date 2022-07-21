import React from 'react'
import { gql, useQuery } from '@apollo/client'
import { Link } from 'react-router-dom'

const GET_USER = gql`
    query GetUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            username
        }
    }
`

function PostCard({ post }) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            getUserId: post.userId,
        },
    })

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

            <div className="py-4">
                <p>{post.body}</p>
            </div>

            <div className="w-full flex justify-end gap-5">
                <button className="border px-3 border-green-400 rounded-md hover:bg-green-400 hover:text-white">
                    {post.likes?.length} Like
                </button>
                <button>
                    <Link to={`/post/${post.id}`}>
                        {post.comments?.length} Comment
                    </Link>
                </button>
            </div>
        </div>
    )
}

export default PostCard
