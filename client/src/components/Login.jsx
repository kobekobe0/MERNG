import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LOGIN_USER = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
        }
    }
`

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const history = useNavigate()
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER)

    const formChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'password') {
            setPassword(value)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        loginUser({
            variables: {
                email,
                password,
            },
        }).then((res) => {
            console.log(res.data.login.token)
            localStorage.setItem('token', res.data.login.token)
            history('/')
        })
    }

    if (loading)
        return (
            <div className="flex justify-center mt-5">
                <h3>Loading...</h3>
            </div>
        )

    return (
        <div className="flex justify-center m-2  flex-col items-center">
            <h1 className="text-2xl m-10">LOGIN</h1>
            <form
                className="flex flex-col text-base xl:w-7/12 lg:w-10/12 md:w-full sm:w-full"
                onSubmit={onSubmit}
            >
                {error ? (
                    <div className="text-red-500">{error.message}</div>
                ) : null}
                <label htmlFor="email" className="text-xs mt-1">
                    Email
                </label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className="p-2 w-full border rounded-md bg-white"
                    onChange={formChange}
                />

                <label htmlFor="password" className="text-xs mt-7">
                    Password
                </label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    className="p-2 w-full border rounded-md bg-white"
                    onChange={formChange}
                />

                <button
                    type="submit"
                    className="p-2 w-full border rounded-md bg-white mt-8 bg-slate-200"
                    onClick={onSubmit}
                >
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Login
