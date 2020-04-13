// Middleware
const {
  forwardAuthenticated,
  ensureAuthenticated,
} = require('../middleware/auth')
const upload = require('../helpers/upload')
const router = new require('express').Router()
// Diffrent routes
const login = require('./auth/login')
const profile = require('./user/profile')
const register = require('./auth/register')
const id = require('./user/id')
const logout = require('./auth/logout')
const match = require('./match/match')

const matchlist =require('./match/matchlist')
const oauth = require('./oauth/oauth')
const chat = require('./chat/chat')

router
  .get('/profile', ensureAuthenticated, profile)
  .get('/', forwardAuthenticated, login.getMethod)
  .get('/register', forwardAuthenticated, register.getMethod)
  .get('/chat/:id', ensureAuthenticated, chat.renderChat)
  .post('/chat/:id', ensureAuthenticated, chat.sendMessage)
  .get('/unmatch/:id', ensureAuthenticated, chat.unMatch)
  .post('/users/authenticate', forwardAuthenticated, login.postMethod)
  .post('/users/register', forwardAuthenticated, register.postMethod)
  .put('/users/:id', ensureAuthenticated, upload.single('photo'), id.putMethod)
  .delete('/users/:id', ensureAuthenticated, id.deleteMethod)
  .get('/users/logout', ensureAuthenticated, logout)
  .get('/matchlist', ensureAuthenticated, matchlist.getMethod)
  .get('/match', ensureAuthenticated, match.getMethod)
  .post('/match', ensureAuthenticated, match.postMethod)
  .use(oauth)

module.exports = router
