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
<<<<<<< HEAD
    // songInfo contains all the track data we want from Spotify.
    const songInfo = getData(spotifyData.items)

    res.render('profile', { song: songInfo })
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
=======
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
>>>>>>> 77ae3b542de0bddde1fb5298cbd116af0061f766
    artist: song.artist,
  }))
}
