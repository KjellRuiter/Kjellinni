const spotify = require('./spotify')

module.exports = async (req, res, next) => {
  console.log(req.session.acces_token)
  try {
    const spotifyData = await spotify({
      // Get access token from req.params.id
      acces_token: req.params.id,
      // Endpoint for the data we want to access.
      endpoint: 'me/top/tracks?limit=1',
    })
    // res.send(spotifyData)
    const cleaned = getData(spotifyData.items)
    res.send(cleaned)
  } catch (e) {
    console.log(`Something went wrong with the server ${e}`)
  }
  // res.render('profile', { song: cleaned })
  // res.render('data', {str: JSON.stringify(str) })
}

function getData(array) {
  return array.map(song => ({
    preview: song.preview_url,
    name: song.name,
    artist: song.artist,
  }))
}
