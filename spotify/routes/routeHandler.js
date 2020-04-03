const express = require('express')
const getLogin = require('../routes/GET/login')

const router = new express.Router()
const oauth = require('./GET/oauth')
const profile = require('./GET/profile')

router
  .use(oauth)
  .get('/', getLogin)
  .get('/profile/:id', profile)

module.exports = router
