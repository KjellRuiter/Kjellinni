const fetch = require('node-fetch')

module.exports = settings =>
  // Endpoint request parameters
  fetch(`https://api.spotify.com/v1/${settings.endpoint}`, {
    headers: {
      Authorization: `Bearer ${settings.acces_token}`,
    },
  }).then(response => response.json())
