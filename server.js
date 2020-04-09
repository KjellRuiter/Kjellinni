// Devlopment branch
require('rootpath')()
require('dotenv').config()

const routes = require('./routes/routeHandler')
const path = require('path')
const express = require('express')
const methodOverride = require('method-override')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('express-flash')
const helmet = require('helmet')
const expectCt = require('expect-ct')
require('./helpers/passport')(passport)

app
  .use(bodyParser.urlencoded({
    extended: true
  }))
  .use(helmet())
  .use(helmet.contentSecurityPolicy({ 
    directives: {
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: [ "'self'", 'https://fonts.googleapis.com' ],
      upgradeInsecureRequests: true,
    }
  }))
  .use(expectCt({
    enforce: true,
    maxAge: 123
  }))
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
      cookie: {
        maxAge: 60000
      },
    }),
  )
  .use(passport.initialize())
  .use(passport.session())

  app.use(helmet.frameguard({ action: 'deny' }))
  .use(flash())
  .use(function (req, res, next) {
    res.locals.message = req.flash('message')
    res.locals.error = req.flash('error')
    next()
  })
  .use(routes)

  .listen(8000, () => console.log('Server listening on port 3000'))
