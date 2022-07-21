import { useContext } from 'react'
import PostCard from './PostCard'
import { gql, useQuery } from '@apollo/client'
import CreatePost from './CreatePost'
import { PostsContext } from '../context/posts.context'
import { useEffect } from 'react'

const GET_POSTS = gql`
    query GetPosts {
        getPosts {
            id
            userId
            body
            createdAt
            comments
            likes
        }
    }
`

function Home() {
    const { loading, error, data } = useQuery(GET_POSTS)
    const { posts, dispatch, loggedin, setLoggedin } = useContext(PostsContext)

    useEffect(() => {
        //check local storage for token
        const token = localStorage.getItem('token')
        console.log(token)
        if (token) {
            //if token is found, set it to the global state
            setLoggedin({ type: 'SET_USER', payload: true })
        }
    }, [])

    useEffect(() => {
        console.log(loggedin)
    }, [loggedin])

    useEffect(() => {
        dispatch({ type: 'SET_POSTS', payload: data?.getPosts })
    }, [data])

    //todo
    //comment on a post
    //like a post
    //delete a post
    //conditional for those who are logged in

    if (loading) return <div>Loading...</div>
    if (error) return <div>Error!</div>

    return (
        <div className="w-full ">
            <div className="grid xl:grid-cols-3 lg:grid-cols-2 auto-rows-auto gap-7 mt-6">
                {loggedin ? <CreatePost /> : null}

                {posts?.map((post) => (
                    <PostCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    )
}

export default Home