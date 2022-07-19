const jwt = require('jsonwebtoken')
const { AuthenticationError } = require('apollo-server')
const secretKey = 'secretKey' //placeholder

module.exports = (context) => {
    const authHeader = context.req.headers.authorization
    console.log('CONTEXT, ' + authHeader)
    if (!authHeader)
        return {
            error: 'No token provided',
        }
    const token = authHeader.split('Bearer ')[1]
    if (!token)
        return {
            error: 'Token must be - Bearer <token>',
        }
    try {
        const decoded = jwt.verify(token, secretKey)
        return decoded //returns userId(id) and email, where userId will be placed in the post.userId field
    } catch (err) {
        throw new AuthenticationError('Invalid token')
    }
}
