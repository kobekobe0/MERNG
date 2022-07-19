const postResolvers = require('./posts.js')
const userResolvers = require('./users.js')
const commentResolvers = require('./comment.js')

module.exports = {
    Query: {
        ...userResolvers.Query,
        ...postResolvers.Query,
        ...commentResolvers.Query,
    },
    Mutation: {
        ...userResolvers.Mutation,
        ...postResolvers.Mutation,
        ...commentResolvers.Mutation,
    },
}
