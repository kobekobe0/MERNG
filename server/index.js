const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
const uri =
    'mongodb+srv://kobekoblanca:Chixxmagnet00@cluster0.kcbgjsu.mongodb.net/MERNG?retryWrites=true&w=majority'
const PORT = process.env.PORT || 3000
const typeDefs = require('./graphql/typedefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ req }),
})

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to database!')
    })
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
