const { makeExecutableSchema } = require('graphql-tools')

// app modules
const typeDefs = require('./type_def')
const resolvers = require('./resolver')

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

module.exports = schema