import React from 'react'
import { gql, useQuery } from '@apollo/client'
const GET_USER = gql`
    query GetUser($getUserId: ID!) {
        getUser(id: $getUserId) {
            username
        }
    }
`

function PostUser({ userId, createdAt }) {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: {
            getUserId: userId,
        },
    })

    let date = Date.now() - parseInt(createdAt)
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
        <div className=" mt-3 flex items-start justify-center">
            <div className="px-4 py-8 w-full">
                <div className="flex justify-center items-center">
                    <div className="flex flex-col justify-center ">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                            alt=""
                            className="w-16 h-16 rounded-full bg-gray-200"
                        />
                        <div className="flex flex-col justify-center items-center">
                            <p>{data?.getUser.username}</p>
                            <p className="text-xs font-light">{toShow}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostUser
