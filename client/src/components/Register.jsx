import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
//import useRegister from '../utils/register'

const REGISTER_USER = gql`
    mutation Register($registerInput: RegisterInput) {
        register(registerInput: $registerInput) {
            token
        }
    }
`

function Register() {
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER)

    const history = useNavigate()

    const formChange = (e) => {
        const { name, value } = e.target
        if (name === 'email') {
            setEmail(value)
        } else if (name === 'username') {
            setUsername(value)
        } else if (name === 'password') {
            setPassword(value)
        } else if (name === 'confirm-password') {
            setConfirmPassword(value)
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        registerUser({
            variables: {
                registerInput: {
                    username,
                    email,
                    password,
                    confirmPassword,
                },
            },
        }).then((res) => {
            console.log(res.data)
            history('/login')
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
            <h1 className="text-2xl m-10">REGISTER</h1>
            <form
                className="flex flex-col text-base xl:w-7/12 lg:w-10/12 md:w-full sm:w-full"
                onSubmit={onSubmit}
            >
                {error ? (
                    <div className="text-red-500">{error.message}</div>
                ) : null}
                <label htmlFor="username" className="text-xs pt-3">
                    Username
                </label>
                <input
                    type="text"
                    name="username"
                    className="p-2 w-full border rounded-md bg-white"
                    onChange={formChange}
                />

                <label htmlFor="email" className="text-xs mt-7">
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

                <label htmlFor="confirm-password" className="text-xs mt-7">
                    Confirm password
                </label>
                <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
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

export default Register
