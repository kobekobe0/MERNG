const User = require('../../models/users.model')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = 10
const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}

module.exports = {
    Query: {
        async getUsers() {
            try {
                const users = await User.find()
                return users
            } catch (err) {
                throw new Error(err)
            }
        },

        async getUser(_, { id }) {
            try {
                const user = await User.findById(id)
                return user
            } catch (err) {
                throw new Error(err)
            }
        },
    },
    Mutation: {
        async login(_, { email, password }) {
            const user = await User.findOne({ email })
            if (!user) {
                throw new Error('User not found')
            }
            const isValid = await bycrypt.compare(password, user.password)
            if (!isValid) {
                throw new Error('Invalid password')
            }
            const token = jwt.sign(
                { id: user._id, email: user.email, username: user.username },
                'secretKey'
            )
            return {
                email: user.email,
                token,
            }
        },

        async register(
            parent,
            { registerInput: { username, email, password, confirmPassword } },
            context,
            info
        ) {
            //validate user data
            const checkUser = await User.findOne({ email })

            if (checkUser === null) {
                let errs = {}

                if (!username) {
                    errs.username = 'Username is required'
                }

                if (validateEmail(email) === false) {
                    errs.email = 'Invalid email'
                }

                if (password !== confirmPassword) {
                    errs.password = 'Passwords do not match'
                }

                if (Object.keys(errs).length > 0) {
                    console.log(Object.keys(errs))
                    throw new Error(Object.values(errs))
                }

                password = await bycrypt.hash(password, salt)

                const newUser = await User.create({
                    username,
                    password,
                    email,
                    createdAt: new Date().toISOString(),
                })

                const token = jwt.sign(
                    {
                        id: newUser._id,
                        username: newUser.username,
                        email: newUser.email,
                    },
                    'secretKey'
                ) //placeholder key

                return {
                    ...newUser._doc,
                    id: newUser._id,
                    token,
                }
            } else {
                throw new Error('User already exists')
            }
        },
    },
}
