require('rootpath')();
require('dotenv').config();

const path = require('path');
const express = require('express');
const methodOverride = require('method-override');

const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('express-flash');
require('./helpers/passport')(passport);
const { forwardAuthenticated, ensureAuthenticated } = require('./helpers/auth');

// Setup request
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(`${__dirname}/static`));

// Setup session and auth
app.use(cookieParser('secret'));
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 },
  })
);

// Initialize Passport and restore authentication state, if any, from the session.
app.use(passport.initialize());
app.use(passport.session());

// Use flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.message = req.flash('message');
  res.locals.error = req.flash('error');

  next();
});

// user routes
app.use('/users', require('./users/user.controller'));

// views
app.get('/', forwardAuthenticated, (req, res) => {
  res.render('pages/login');
});
app.get('/register', forwardAuthenticated, (req, res) =>
  res.render('pages/register')
);

app.get('/profile', ensureAuthenticated, (req, res) => {
  res.render('pages/profile', { user: req.user });
});

app.get('/match', ensureAuthenticated, (req, res) => res.render('pages/match'));

// start server
const server = app.listen(3000, () =>
  console.log('Server listening on port 3000')
);
