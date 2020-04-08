const getSong = require('./getSong')
const Songs = require('../../database/models/songs')

module.exports = async (req, res) => {
  // Connect to songs model.
  await req.user.populate('songs').execPopulate()
  // Connect to matches model.
  await req.user.populate('matches').execPopulate()
  req.session.user = req.user
  const songInDb = req.session.user.songs

  // Check if song data is already in database or not.
  if (!songInDb) {
    // Check if user retrieved an acces token.
    if (req.session.acces_token) {
      const song = await getSong(req.session.acces_token)
      // Set data for database.
      const newSongs = await new Songs({
        owner: req.session.user._id,
        artist: song[0].artist,
        preview: song[0].preview,
        song_name: song[0].name,
        img_url: song[0].img,
      })
      // Save data.
      await newSongs.save()
    }
    // Check if user already has Spotify data stored.
  } else if (req.session.user.songs) {
    console.log('song already in database')
  }

  req.session.matches = req.user.matches
  res.render('pages/profile', { user: req.user })
}
