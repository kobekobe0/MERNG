import React from 'react'
import { useParams } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'
import PostUser from './PostUser'
import InputComment from './InputComment'
import CommentCards from './CommentCards'
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

function Post() {
    let { id } = useParams()
    console.log(id)
    const { loading, error, data } = useQuery(GET_POST, {
        variables: {
            postId: id,
        },
    })
    if (loading) return <div>Loading...</div>
    if (error) console.log(error)
    console.log(data)
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
                        <button className="border border-green-500 hover:bg-green-500 rounded-md flex w-14 items-center justify-center mt-4 p-1 text-xs">
                            {data?.getPost.likes.length} like
                        </button>
                    </div>
                </div>
                <InputComment />

                <CommentCards postId={data?.getPost.id} />
            </div>
        </div>
    )
}

export default Post
