// Middleware
const {
  forwardAuthenticated,
  ensureAuthenticated,
} = require('../middleware/auth')
const upload = require('../helpers/upload')()
const router = new require('express').Router()
// Diffrent routes
const login = require('./auth/login')
const profile = require('./user/profile')
const register = require('./auth/register')
const id = require('./user/id')
const logout = require('./auth/logout')

router
  .get('/profile', ensureAuthenticated, profile)
  .get('/', forwardAuthenticated, login.getMethod)
  .get('/register', forwardAuthenticated, register.getMethod)
  .post('/users/authenticate', forwardAuthenticated, login.postMethod)
  .post('/users/register', forwardAuthenticated, register.postMethod)
  .put(
    '/users/:id',
    [ensureAuthenticated, upload.single('photo')],
    id.putMethod,
  )
  .delete('/users/:id', ensureAuthenticated, id.deleteMethod)
  .get('/users/logout', ensureAuthenticated, logout)

module.exports = router
