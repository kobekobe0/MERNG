import React from 'react'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import { PostsContext } from '../context/posts.context'
import { useNavigate } from 'react-router-dom'
function Navbar() {
    const history = useNavigate()
    const [hasUser, setHasUser] = useState(false)
    const { loggedin, setLoggedin } = useContext(PostsContext)
    useEffect(() => {
        console.log(loggedin)
        if (localStorage.getItem('token')) {
            setHasUser(true)
        } else {
            setHasUser(false)
        }
    }, [loggedin])

    const logOut = () => {
        localStorage.removeItem('token')
        history('/')
        setLoggedin({ type: 'SET_USER', payload: false })
    }

    return (
        <div className="flex w-full border-b-4 justify-center items-center">
            <div className="flex w-full  justify-between px-7 font-medium">
                <div className="p-5 cursor-pointer transition ease-in-out hover:text-slate-400">
                    <Link to="/" className="text-sky-900 text-xl">
                        Twitter,{' '}
                        <span className="text-sm font-light">
                            but{' '}
                            <span className="opacity-60 text-xs">(use)</span>
                            less
                        </span>
                    </Link>
                </div>
                <div className="flex">
                    <ul className="flex ">
                        {hasUser ? (
                            <li
                                onClick={logOut}
                                className="p-5 cursor-pointer transition ease-in-out  hover:bg-slate-100"
                            >
                                Logout
                            </li>
                        ) : (
                            <>
                                <li className="p-5 cursor-pointer transition ease-in-out  hover:bg-slate-100">
                                    <Link to="/login">Login</Link>
                                </li>
                                <li className="p-5 cursor-pointer transition ease-in-out hover:bg-slate-100">
                                    <Link to="/register">Register</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar
