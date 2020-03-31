const express = require('express')
const getLogin = require('../routes/GET/login')

const router = new express.Router()
const oauth = require('./GET/oauth')
const test = require('./GET/test')

router
  .use(oauth)
  .get('/', getLogin)
  .get('/test', test)

module.exports = router
