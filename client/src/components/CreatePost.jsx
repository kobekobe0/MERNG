import { useContext } from 'react'
import { PostsContext } from '../context/posts.context'
import { gql, useMutation } from '@apollo/client'

const CREATE_POST = gql`
    mutation CreatePost($body: String!) {
        createPost(body: $body) {
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

    const { dispatch } = useContext(PostsContext)

    const onSubmit = async (e) => {
        e.preventDefault()
        const res = await createPost({
            variables: {
                body: 'This is a test post',
            },
        }).then((res) => {
            console.log(res.data)

            dispatch({ type: 'ADD_POST', payload: res.data.createPost })
        })
    }

    return (
        <div className="flex flex-col rounded-md p-3 max-h-48 justify-center">
            <label htmlFor="post" className="text-lg font-medium">
                Create a post:
            </label>
            <input type="text" name="post" id="post" className="border p-2 " />
            <button
                onClick={onSubmit}
                className="border w-1/5 px-3 mt-3 rounded-md bg-teal-400 text-white border-teal-400 justify-self-end self-end"
            >
                Post
            </button>
        </div>
    )
}

export default CreatePost
