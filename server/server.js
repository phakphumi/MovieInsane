const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const {
  graphiqlExpress,
  graphqlExpress
} = require('apollo-server-express')
const mongoose = require('mongoose')

const port = 10101
const app = express()

// app modules
const schema = require('./graphql')
const DB = require('./model')

// setting up middleware for the app
app.use(cors())
app.use(morgan('dev'))

// setting up graphql
app.use('/graphql', bodyParser.json(), graphqlExpress({
    // TODO: adding schema and context
  schema,
  context: {
    DB
  }
}))

// setting up a graphiql a ui for testing our query
app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
}))

// connecting to a mongodb database with name of db fullstack
mongoose.connect('mongodb://database:27017/db', () => {
  console.log('connected to database successfully')
})

// starting the server
app.listen(port, () => {
    console.log(`starting graphql server on localhost:${port}`)
})