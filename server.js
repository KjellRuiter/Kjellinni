// Test Devlopment branch

require('rootpath')()
require('dotenv').config()

const testRoutes = require('./routes/routeHandler')
const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
require('./helpers/passport')(passport)
const { forwardAuthenticated, ensureAuthenticated } = require('./helpers/auth')
const matchRoute = require('./matching/matchRoute')

// Setup request

// EJS
app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(methodOverride('_method'))
  .set('view engine', 'ejs')
  .set('views', path.join(__dirname, 'views'))
  .use(express.static(`${__dirname}/static`))
  .use(cookieParser('secret'))
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 },
    }),
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(flash())
  .use(function(req, res, next) {
    res.locals.message = req.flash('message')
    res.locals.error = req.flash('error')
    next()
  })
  .use('/users', require('./users/user.controller'))
  .use(testRoutes)
  .get('/match', ensureAuthenticated, matchRoute)
  .listen(3000, () => console.log('Server listening on port 3000'))
