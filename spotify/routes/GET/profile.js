const spotify = require('./spotify')

module.exports = async (req, res) => {
  console.log(req.session.acces_token)
  const spotifyData = await spotify({
    acces_token: req.session.acces_token,
    endpoint: 'me',
  })
  res.send(`
        test
    `)
  console.log(spotifyData)
}
