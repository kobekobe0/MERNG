import { useContext, useState } from 'react'
import { PostsContext } from '../context/posts.context'
import { gql, useMutation } from '@apollo/client'

const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
            id
            userId
            createdAt
            body
            comments
            likes
        }
    }
`

function CreatePost() {
    const [createPost, { data, loading, error }] = useMutation(CREATE_POST)
    const [body, setBody] = useState('')
    const { dispatch } = useContext(PostsContext)

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await createPost({
            variables: {
                body: body,
            },
        }).then((res) => {
            console.log(res.data)
            setBody('')
            dispatch({ type: 'ADD_POST', payload: res.data.createPost })
        })
    }

    return (
        <div className="flex flex-col rounded-md p-3 max-h-48 justify-center">
            <label htmlFor="post" className="text-lg font-medium">
                Create a post:
            </label>
            <input
                type="text"
                name="post"
                id="post"
                className="border p-2 "
                value={body}
                onChange={(e) => setBody(e.target.value)}
            />
            <button
                onClick={onSubmit}
                className="border w-1/5 px-3 mt-3 rounded-md bg-slate-600 text-white justify-self-end self-end"
            >
                Post
            </button>
        </div>
    )
}

export default CreatePost
