const express = require('express')
const jwt = require('jsonwebtoken')
const expressJwt = require('express-jwt')
const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const cors = require('cors')
const morgan = require('morgan')
const {
  graphiqlExpress,
  graphqlExpress
} = require('apollo-server-express')
const mongoose = require('mongoose')

const port = 10101

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser('anything'))
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

// app modules
const schema = require('./graphql')
const DB = require('./model')

// setting up middleware for the app
app.use(cors())
app.use(morgan('dev'))

const addUser = (req, res, next) => {
  const token = req.headers.authorization
  try {
    const user = jwt.verify(token, 'MY SECRET')
    req.user = user
  } catch (err) {
    req.user = { isAdmin: false }
    console.log(err)
  }
  next()
}

app.use(addUser)

passport.serializeUser(function(user, done) {
  done(null, user);
})

passport.deserializeUser(function(user, done) {
  done(null, user);
})

passport.use(new FacebookStrategy({
    clientID: '144264979620562',
    clientSecret: 'd5a5b374d63c8dc067154b8254dd39e9',
    callbackURL: "http://localhost:10101/auth/facebook/callback"
  }, function(accessToken, refreshToken, profile, done) {
    process.nextTick(function () {
      return done(null, { id: profile.id });
    })
  }
))

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback', 
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    const token = jwt.sign(
      {
        isAdmin: true
      }, 'MY SECRET',
      {
        expiresIn: '1d'
      }
    )
    res.cookie('token', token, { maxAge: 1000 * 60 * 60 * 24, httpOnly: false });
    res.redirect('http://localhost:8080')
  }
)
// setting up graphql
app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
    schema,
    context: { 
      DB,
      user: req.user 
    }
  })))

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