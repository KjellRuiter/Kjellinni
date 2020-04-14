// Devlopment branch
require('rootpath')()
require('dotenv').config()

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
const routes = require('./routes/routeHandler')
const sixtyDaysInSeconds = 5184000
const hstsMiddleware = helmet.hsts({maxAge: sixtyDaysInSeconds})
require('./helpers/passport')(passport)

app
  .use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  .use(helmet())
  .use(
    helmet.contentSecurityPolicy({
      directives: {
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        upgradeInsecureRequests: true,
      },
      browserSniff: false,
    })
  )
  // Tells browsers to prevent your webpage from being put in an iframe
  .use(
    helmet.frameguard({
      action: 'sameorigin'
    })
  )
    // Tells the browser to stick with HTTPS and never use HTTP
  .use(
    (req, res, next) => {
      if (req.secure) {
        hstsMiddleware(req, res, next)
      } else {
        next()
      }
    }
  )
  // if we want to work with certificates in the future 
  .use(
    expectCt({
      enforce: true,
      maxAge: 123,
    })
  )
  //  Set by web browsers to tell a server where a request it’s coming from
  .use(
    helmet.referrerPolicy({
       policy: 'same-origin' 
    })
  )
  // This will prevent old versions of Internet Explorer from allowing malicious HTML downloads to be executed 
  .use(
    helmet.ieNoOpen()
  )
  // to make sure nobody knows what technology is used for our server
  .disable('x-powered-by') 

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
        maxAge: 60000,
      },
    })
  )
  .use(passport.initialize())
  .use(passport.session())

app
  .use(flash())
  .use(function(req, res, next) {
    res.locals.message = req.flash('message')
    res.locals.error = req.flash('error')
    next()
  })
  .use(routes)

  .listen(3000, () => console.log('Server listening on port 3000'))
