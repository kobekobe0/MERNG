const User = require('../../models/users.model')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const salt = 10
const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/
    return re.test(email)
}

module.exports = {
    Mutation: {
        //parent is from returned value from the resolver
        //before calling this resolver, just like how middleware works

        //args(second param) is the arguments passed to the resolver, located at typeDefs
        async register(
            parent,
            { registerInput: { username, password, confirmPassword, email } },
            context,
            info
        ) {
            //validate user data
            const checkUser = await User.findOne({ email })

            if (checkUser === null) {
                if (validateEmail(email) === false) {
                    throw new Error('Invalid email')
                }

                if (password !== confirmPassword) {
                    throw new Error('Passwords do not match')
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
