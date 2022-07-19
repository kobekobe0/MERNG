const { gql } = require('apollo-server')

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

    type Comment {
        _id: ID
        description: String
        createdAt: String
        user: User
    }

    type Post {
        id: ID
        usenname: String
        body: String
    }

    input RegisterInput {
        username: String!
        email: String!
        password: String!
        confirmPassword: String!
    }

    type Query {
        getPosts: [Post]
        createPost: Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User
    }
`
