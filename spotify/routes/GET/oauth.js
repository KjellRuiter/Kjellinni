const express = require('express')
const request = require('request')
const querystring = require('querystring')

const router = express.Router()
require('dotenv').config()

// REDIRECT URI that's defined in Spotify settings.
const redirect_uri = process.env.REDIRECT_URI

router
  // Request authorization.
  .get('/spotify/login', function(req, res) {
    console.log('redirect')
    res.redirect(
      `https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.SPOTIFY_CLIENT_ID,
        // Set autohorization scopes.
        // Scopes of user data we want to access.
        scope: 'user-read-private user-read-email user-top-read',
        redirect_uri,
      })}`
    )
  })

  // Requests and access the user's access tokens
  .get('/spotify/callback', function(req, res) {
    const code = req.query.code || null
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code,
        redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization: `Basic ${new Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString('base64')}`,
      },
      json: true,
    }
    request.post(authOptions, function(error, response, body) {
      const { access_token } = body
      console.log(access_token)
      const uri = process.env.FRONTEND_URI || 'http://localhost:8888/profile'
      req.session.acces_token = access_token
      console.log(req.session)
      res.redirect(uri)
    })
  })

module.exports = router
