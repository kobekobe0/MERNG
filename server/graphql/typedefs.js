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
        id: ID!
        body: String!
        createdAt: String!
        user: User!
        postId: ID!
        likes: [User]!
    }

    type Like {
        id: ID!
        username: String!
        createdAt: String!
    }

    type Post {
        id: ID!
        userId: String!
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
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

        getCommentByPost(postId: ID!): [Comment]

        getUsers: [User]
        getUser(id: ID!): User
    }

    type Mutation {
        register(registerInput: RegisterInput): User!
        login(email: String!, password: String!): User!

        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        likePost(postId: ID!): String!
        updateComment(postId: ID!, commentId: ID!, body: String!): Comment!

        createComment(postId: ID!, body: String!): Comment!
        deleteComment(postId: ID!, commentId: ID!): String!
    }
`
