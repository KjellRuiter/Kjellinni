const spotify = require('./spotify')

module.exports = async (token) => {
  // console.log(req.session.acces_token)
  try {
    const spotifyData = await spotify({
      // Get access token from req.params.id
      acces_token: token,
      // Endpoint for the data we want to access.
      endpoint: 'me/top/tracks?limit=1',
    })
    // songInfo contains all the track data we want from Spotify.
    const songInfo = getData(spotifyData.items)
    return songInfo
  } catch (e) {
    console.log(`Something went wrong with the server ${e}`)
  }
}

function getData(array) {
  return array.map(song => ({
    // Returns preview url from the track.
    preview: song.preview_url,
    // Returns the name from the track.
    name: song.name,
    // Returns the artist(s) from the track.
    artist: song.artists[0].name,
    // Returns the image of the track.
    img: song.album.images[2].url,
  }))
}
