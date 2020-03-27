const express = require('express')

const router = express.Router()
const passport = require('passport')
const userService = require('./user.service')
const { forwardAuthenticated, ensureAuthenticated } = require('../helpers/auth')
const upload = require('../helpers/upload.js')()

function authenticate(req, res, next) {
  passport.authenticate('local', {
    failureRedirect: '/',
    successRedirect: '/profile',
    failureFlash: 'Fout email of wachtwoord.',
  })(req, res, next)
}

function register(req, res, next) {
  userService
    .create(req.body, req)
    .then(() => {
      passport.authenticate('local', {
        failureRedirect: '/',
        successRedirect: '/profile',
        failureFlash: 'Fout email of wachtwoord.',
      })(req, res, next)
    })
    .catch(err => {
      res.redirect('/register')
    })
}

function update(req, res, next) {
  userService
    .update(req.params.id, req.body, req.file)
    .then(() => res.redirect('/profile'))
}

function logout(req, res, next) {
  req.logout()
  res.redirect('/')
}

function _delete(req, res, next) {
  userService.delete(req.params.id).then()
  res.redirect('/')
}

// routes
// router.post('/authenticate', forwardAuthenticated, authenticate)
// router.post('/register', forwardAuthenticated, register)
// router.get('/logout', ensureAuthenticated, logout)

// router.put('/:id', [ensureAuthenticated, upload.single('photo')], update)
// router.delete('/:id', ensureAuthenticated, _delete)

module.exports = router
