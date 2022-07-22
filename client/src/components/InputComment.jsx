import { useContext, useEffect, useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { PostsContext } from '../context/posts.context'

const CREATE_COMMENT = gql`
    mutation CreateComment($postId: ID!, $body: String!) {
        createComment(postId: $postId, body: $body) {
            id
            postId
            body
            createdAt
            userId
        }
    }
`

function InputComment({ postId }) {
    const [body, setBody] = useState('')
    const { comments, commentDispatch } = useContext(PostsContext)
    const [createComment, { data, loading, error }] =
        useMutation(CREATE_COMMENT)

    useEffect(() => {
        console.log(comments)
    }, [comments])

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await createComment({
            variables: {
                postId,
                body,
            },
        }).then((res) => {
            console.log(res.data)

            commentDispatch({
                type: 'ADD_COMMENT',
                payload: res.data.createComment,
            })
        })
    }
    return (
        <div className="mt-3 border rounded-md p-3">
            <form action="submit" className="flex justify-end items-end">
                <div className="w-full">
                    <label htmlFor="comment" className="text-xs m-0">
                        Comment
                    </label>
                    <input
                        type="text"
                        name="comment"
                        id="comment"
                        onChange={(e) => setBody(e.target.value)}
                        className="p-2 w-full border border-r-0 rounded-tl-md rounded-bl-md bg-white"
                    />
                </div>

                <button
                    onClick={onSubmit}
                    className="p-2 bg-slate-300 border  rounded-tr-md rounded-br-md bg-white"
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default InputComment
