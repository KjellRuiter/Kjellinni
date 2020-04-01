const spotify = require('./spotify')

module.exports = async (req, res) => {
  console.log(req.session.acces_token)
  const spotifyData = await spotify({
    acces_token: req.session.acces_token,
    // Endpoint for the data we want to access.
    endpoint: 'me/top/tracks',
  })
  res.send(`
        test
    `)
  console.log(spotifyData)
}


