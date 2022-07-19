const { gql } = require('apollo-server')

//typeDefs define what are the returnable values from the queries
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
        userId: String!
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
        getPostsByUser(userId: ID!): [Post]
        getPost(postId: ID!): Post
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
    }
`
