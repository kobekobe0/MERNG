import jwt_decode from 'jwt-decode'
import { createContext, useEffect, useReducer } from 'react'
export const PostsContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.payload
        case 'ADD_POST':
            console.log(state)
            console.log(action.payload)
            state = [action.payload, ...state]
            return state
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.payload)
        case 'LIKE_POST':
            if (localStorage.getItem('token') !== null) {
                return state.map((post) => {
                    if (post.id === action.payload) {
                        console.log(action.payload)
                        return {
                            ...post,
                            likes: [
                                ...post.likes,
                                jwt_decode(
                                    localStorage
                                        ?.getItem('token')
                                        ?.replace('bearer ', '')
                                )?.id,
                            ],
                        }
                    }
                    return post
                })
            }

        case 'UNLIKE_POST':
            return state.map((post) => {
                if (post.id === action.payload) {
                    return {
                        ...post,
                        likes: post.likes.filter(
                            (id) =>
                                id !==
                                jwt_decode(
                                    localStorage
                                        ?.getItem('token')
                                        ?.replace('bearer ', '')
                                )?.id
                        ),
                    }
                }
                return post
            })
        default:
            return state
    }
}

const userInitial = false

const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return action.payload
        case 'LOGOUT':
            return false
        default:
            return state
    }
}

const initialComment = []
const commentReducer = (state, action) => {
    switch (action.type) {
        case 'SET_COMMENTS':
            return action.payload
        case 'ADD_COMMENT':
            return [action.payload, ...state]
        case 'CLEAR_COMMENT':
            return []
        case 'DELETE_COMMENT':
            return state.filter((comment) => comment.id !== action.payload)
        default:
            return state
    }
}

export const PostsProvider = ({ children }) => {
    const [posts, dispatch] = useReducer(reducer, initialState)
    const [loggedin, setLoggedin] = useReducer(userReducer, userInitial)
    const [comments, commentDispatch] = useReducer(
        commentReducer,
        initialComment
    )

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            const token = jwt_decode(localStorage.getItem('token')).id
            if (token) {
                //if token is found, set it to the global state
                setLoggedin({ type: 'SET_USER', payload: true })
            }
        }
    }, [])
    return (
        <PostsContext.Provider
            value={{
                posts,
                dispatch,
                setLoggedin,
                loggedin,
                comments,
                commentDispatch,
            }}
        >
            {children}
        </PostsContext.Provider>
    )
}
