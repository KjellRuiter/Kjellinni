const express = require('express')
const session = require('express-session')
const nodemon = require('nodemon')

const app = express()
const routes = require('./routes/routeHandler')

require('dotenv').config()

app.use(
  // Set session properties.
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
      maxAge: 3600000,
    },
  })
)

app.use(routes)

const port = process.env.PORT
console.log(
  `Listening on port ${port}. Go to /to initiate authentication flow.`
)
app.listen(port)
