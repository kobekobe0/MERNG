//createContext
import { createContext, useEffect, useReducer } from 'react'
export const PostsContext = createContext()

const initialState = []

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_POSTS':
            return action.payload
        case 'ADD_POST':
            return [action.payload, ...state]
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.payload)
        case 'LIKE_POST':
            return state.map((post) => {
                if (post.id === action.payload) {
                    return {
                        ...post,
                        likes: [...post.likes, action.userId],
                    }
                }
                return post
            })
        case 'UNLIKE_POST':
            return state.map((post) => {
                if (post.id === action.payload) {
                    return {
                        ...post,
                        likes: post.likes.filter((id) => id !== action.userId),
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

export const PostsProvider = ({ children }) => {
    const [posts, dispatch] = useReducer(reducer, initialState)
    const [loggedin, setLoggedin] = useReducer(userReducer, userInitial)
    return (
        <PostsContext.Provider
            value={{ posts, dispatch, setLoggedin, loggedin }}
        >
            {children}
        </PostsContext.Provider>
    )
}
