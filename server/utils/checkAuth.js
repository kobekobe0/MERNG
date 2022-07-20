const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const secretKey = 'secretKey' //placeholder

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    if (!authHeader)
        return {
            error: 'No token provided',
        }

    try {
        const token = authHeader.split('Bearer ')[1]
        console.log(typeof token)

        const decoded = jwt.verify(token, secretKey)
        return decoded //returns userId(id) and email, where userId will be placed in the post.userId field
    } catch (err) {
        throw new AuthenticationError('Invalid token')
    }
}
