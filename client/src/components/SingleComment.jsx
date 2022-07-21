import React from 'react'

function SingleComment({ comment }) {
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
    return (
        <div className="border p-5 w-full rounded-md mt-3">
            <img
                src="https://cdn-icons-png.flaticon.com/512/456/456212.png"
                className="w-10 h-10 rounded-full mr-3 bg-gray-200"
            />
            <p>{toShow}</p>
            <p>{comment.body}</p>
        </div>
    )
}

export default SingleComment
